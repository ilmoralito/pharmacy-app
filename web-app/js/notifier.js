function createNotifier() {
    function notify(message) {
        if (Notification.permissions === 'granted') {
            showNotification(message);

            return;
        }

        if (Notification.permissions !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    showNotification(message);
                }
            });
        }
    }

    function showNotification(message) {
        const notification = new Notification('A ocurrido un error', {
            body: message
        });

        setTimeout(notification.close.bind(notification), 5000);
    }

    return {
        notify
    };
}
