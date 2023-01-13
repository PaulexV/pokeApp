import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(
			BrowserAnimationsModule,
			HttpClientModule,
			ServiceWorkerModule.register('ngsw-worker.js', {
				enabled: !isDevMode(),
				// Register the ServiceWorker as soon as the application is stable
				// or after 30 seconds (whichever comes first).
				registrationStrategy: 'registerWhenStable:30000',
			})
		),
	],
}).catch((err) => console.error(err));
