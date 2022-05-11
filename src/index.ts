import Preloader from 'core/boot/preloader';
import Server from 'core/http/server';
import Application from 'core/boot/application';

Preloader.init('en-US', 'Europe/Lisbon').preloading(() => {
    Application.start(() => {
        Server.init(Application).start();
    });
});
