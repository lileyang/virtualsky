<template>
  <div ref="scrollContainer" class="pdf-scroll-container">
    <div v-if="!pdfDoc" class="loading-overlay">
      <div class="spinner"></div>
      <div class="progress-text">{{ loadProgress }}%</div>
    </div>


    <button class="back-btn" @click="goBack">返回</button>
    <div
      v-for="pageNum in totalPages"
      :key="pageNum"
      class="pdf-page-placeholder"
      :style="{ height: pageHeights[pageNum - 1] || defaultPageHeight + 'px' }"
      :ref="'pageRef' + pageNum"
    >
      <canvas
        :ref="'canvas' + pageNum"
        class="pdf-canvas"
        
      />

    </div>
  </div>
</template>

<script>
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function throttle(func, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export default {
  data() {
    return {
      pdfUrl: '',
      pdfDoc: null,
      totalPages: 0,
      observer: null,
      renderedPages: new Set(),
      pageHeights: [],
      defaultPageHeight: 1200,
      visiblePages: new Set(),
      loadProgress: 0,
    };
  },
  mounted() {
    this.pdfUrl = this.$route.query.pdfUrl;

    if (!this.pdfUrl) {
      console.error("❌ 无效的 pdfUrl");
      this.$router.replace('/'); // 或跳回上一级
      return;
    }

    this.loadPDF();
    
    window.addEventListener('resize', this.handleResizeThrottled);
  },
  beforeDestroy() {
    if (this.observer) this.observer.disconnect();
    if (this.pdfDoc) this.pdfDoc.destroy();
    window.removeEventListener('resize', this.handleResizeThrottled);
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    async loadPDF() {
      const loadingTask = pdfjsLib.getDocument({
        url: this.pdfUrl,
        rangeChunkSize: 65536, // 默认是65536，可以根据网络和硬件微调
        disableStream: false,  // 显式启用流式加载
        disableAutoFetch: false, // 让 PDF.js 在用户快滚动时预取页面
        withCredentials: false,
      });
      loadingTask.onProgress = ({ loaded, total }) => {
        this.loadProgress = Math.min(Math.round((loaded / total) * 100), 100);
      };

      this.pdfDoc = await loadingTask.promise;
      this.totalPages = this.pdfDoc.numPages;
      this.pageHeights = new Array(this.totalPages).fill(this.defaultPageHeight);

      this.$nextTick(() => {
        setTimeout(() => {
          this.setupIntersectionObserver();
        }, 10); // 延迟确保 DOM 挂载完成
      });

      // 预加载第一页，避免白屏
      this.renderPage(1);
      this.renderPage(2); // 解决 page2 不渲染的问题
    },
    setupIntersectionObserver() {
      const options = {
        root: this.$refs.scrollContainer,
        rootMargin: '0px 0px 0px 0px', // 上下100px，左右0px
        threshold: 0.1
      };
      this.observer = new IntersectionObserver(this.onIntersect, options);

      for (let pageNum = 1; pageNum <= this.totalPages; pageNum++) {
        const ref = this.$refs['pageRef' + pageNum];
        if (ref) {
          const el = Array.isArray(ref) ? ref[0] : ref;
          this.observer.observe(el);
        } else {
          console.warn(`no ref for page ${pageNum}`);
        }
      }
    },
    onIntersect(entries) {
      for (const entry of entries) {
        const pageNum = this.getPageNumFromElement(entry.target);
        console.log(`🔍 onIntersect: page ${pageNum}, isIntersecting: ${entry.isIntersecting}`);

        if (entry.isIntersecting && pageNum > 0) {
          this.visiblePages.add(pageNum);
          if (!this.renderedPages.has(pageNum)) {
            console.log(`🖼️ 触发渲染 page ${pageNum}`);
            this.throttledRenderPage(pageNum);
          }
          if (!this.renderedPages.has(pageNum + 1) && pageNum + 1 <= this.totalPages) {
            this.throttledRenderPage(pageNum + 1);
          }
          this.pruneOffscreenPages(pageNum);
        }
      }
    },
    getPageNumFromElement(el) {
      const keys = Object.keys(this.$refs);
      for (const key of keys) {
        const ref = this.$refs[key];
        if (ref === el || (Array.isArray(ref) && ref[0] === el)) {
          const match = key.match(/^pageRef(\d+)$/);
          if (match) return parseInt(match[1]);
        }
      }
      return -1;
    },
    async renderPage(pageNum) {
      try {
        console.log(`🚀 开始渲染 Page ${pageNum}`);
        if (this.renderedPages.has(pageNum)) return;

        const page = await this.pdfDoc.getPage(pageNum);
        const containerWidth = this.$refs.scrollContainer?.clientWidth || 800;

        const viewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / viewport.width;

        const dpr = window.devicePixelRatio || 1;
        const scaledViewport = page.getViewport({ scale: scale * dpr });

        const canvasRef = this.$refs['canvas' + pageNum];
        const canvas = Array.isArray(canvasRef) ? canvasRef[0] : canvasRef;

        if (!canvas) {
          console.warn(`⚠️ Canvas 未挂载 Page ${pageNum}，重试...`);
          setTimeout(() => this.renderPage(pageNum), 100);
          return;
        }

        const context = canvas.getContext('2d');
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        // 设置 CSS 尺寸为视觉宽度
        canvas.style.width = `${scaledViewport.width / dpr}px`;
        canvas.style.height = `${scaledViewport.height / dpr}px`;

        this.$set(this.pageHeights, pageNum - 1, scaledViewport.height / dpr);

        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport
        };

        await page.render(renderContext).promise;

        this.renderedPages.add(pageNum);
        console.log(`✅ 渲染完成 Page ${pageNum}`);
      } catch (e) {
        console.error('渲染 Page 失败:', e);
      }
    },
    throttledRenderPage: throttle(function (pageNum) {
      this.renderPage(pageNum);
    }, 100),
    pruneOffscreenPages(currentPage) {
      for (const page of Array.from(this.renderedPages)) {
        if (Math.abs(page - currentPage) > 10) { // 从5改成10，放宽范围
          this.renderedPages.delete(page);
          // 清空 canvas
          const canvasRef = this.$refs['canvas' + page];
          if (canvasRef) {
            const canvas = Array.isArray(canvasRef) ? canvasRef[0] : canvasRef;
            if (canvas) {
              const ctx = canvas.getContext('2d');
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
          }
        }
      }
    },
    handleResizeThrottled: throttle(function () {
      for (const pageNum of this.visiblePages) {
        this.renderedPages.delete(pageNum);
        this.renderPage(pageNum);
      }
    }, 300)
  }
};
</script>

<style scoped>
.pdf-scroll-container {
  height: 100vh;
  overflow-y: auto;
}
.pdf-page-placeholder {
  width: 100%;
  position: relative;
}
.pdf-canvas {
  display: block;
  margin: 0 auto 4px;
  width: 100vw;
  height: auto;
  border: 1px solid #ccc;
}
.back-btn {
  position: absolute;
  margin: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 16px;
  color: green;
  box-shadow: 0 4px 8px rgba(0, 128, 0, 0.2);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  z-index: 2;
}

.back-btn:hover {
  background-color: rgba(255, 255, 255, 0.9);
  transform: scale(1.05);
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.spinner {
  width: 72px;
  height: 72px;
  border: 6px solid #ccc;
  border-top-color: green;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.progress-text{
  position: absolute;
  color: green;
  font-family: 'MyFont', sans-serif;
  font-size: 20px;
}

</style>
