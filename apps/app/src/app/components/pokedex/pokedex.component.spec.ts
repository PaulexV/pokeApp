import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexComponent } from './pokedex.component';

describe('PokedexComponent', () => {
	let component: PokedexComponent;
	let fixture: ComponentFixture<PokedexComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PokedexComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PokedexComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
