import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { Router } from '@angular/router';

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(ref => {
    const router = ref.injector.get(Router);
    router.events.subscribe(event => {
      console.log(event);
    });
  })
  .catch(err => console.error(err));
