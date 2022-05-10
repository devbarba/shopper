import 'core/boot/preloader';
import Server from 'core/http/server';
import Application from 'core/boot/application';

Application.start(() => {
    Server.init(Application).start();
});
