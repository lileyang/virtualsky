// utils/navigation.js
export function safePush(router, location) {
  return router.push(location).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      console.error('导航跳转错误:', err);
    }
  });
}
