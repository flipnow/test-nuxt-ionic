export default defineNuxtRouteMiddleware((to) => {
  console.log('middleware', to);
  if (to.name === 'Test') {
    console.log(to);
  }

  return navigateTo('/');
});
