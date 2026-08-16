
export const toast = {
  show: (message, type = 'success', duration = 4000) => {
    const event = new CustomEvent('app-toast', {
      detail: { id: Math.random().toString(36).substring(2, 9), message, type, duration }
    });
    window.dispatchEvent(event);
  },
  success: (message, duration) => {
    toast.show(message, 'success', duration);
  },
  error: (message, duration) => {
    toast.show(message, 'danger', duration);
  }
};
