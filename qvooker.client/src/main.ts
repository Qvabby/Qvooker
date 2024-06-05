import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { Router } from '@angular/router';

import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

//platformBrowserDynamic().bootstrapModule(AppModule)
//  .catch(err => console.error(err));

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(ref => {
    const router = ref.injector.get(Router);
    router.events.subscribe(event => {
      console.log(event);
    });
  })
  .catch(err => console.error(err));
