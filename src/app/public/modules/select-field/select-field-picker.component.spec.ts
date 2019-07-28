import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SkySelectFieldFixturesModule } from './fixtures/select-field-fixtures.module';
import { SkySelectFieldPickerComponent } from './select-field-picker.component';
import { SkyMediaBreakpoints, SkyMediaQueryService, SkyWindowRefService } from '@skyux/core';
import { Subject, of } from 'rxjs';
import { SkySelectFieldPickerContext } from './select-field-picker-context';
import { SkyModalInstance, SkyModalHostService, SkyModalConfiguration } from '@skyux/modals';

describe('sky select field picker component', () => {

  let fixture: ComponentFixture<SkySelectFieldPickerComponent>;
  let component: SkySelectFieldPickerComponent;
  let resolutionSubject = new Subject();

  function getDefaultContext(): SkySelectFieldPickerContext {
    let context = new SkySelectFieldPickerContext();
    context.data = of([]);
    return context;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkySelectFieldFixturesModule
      ], providers: [
        {
          provide: SkyMediaQueryService,
          useValue: resolutionSubject
        },
        {
          provide: SkySelectFieldPickerContext,
          useValue: getDefaultContext()
        },
        SkyWindowRefService,
        SkyModalHostService,
        SkyModalConfiguration,
        SkyModalInstance
      ]
    });

    fixture = TestBed.createComponent(SkySelectFieldPickerComponent);
    component = fixture.componentInstance;
  });

  describe('hideNewButtonText', () => {

    it('should hide the text of new button when mediaQueries is triggered from small screen ', () => {
      component.showNewButtonText = true;
      resolutionSubject.next(SkyMediaBreakpoints.xs);
      fixture.detectChanges();
      expect(component.showNewButtonText).toBeFalsy();
    });

    it('should show the text of new button when mediaQueries is triggered from small screen ', () => {
      component.showNewButtonText = true;
      resolutionSubject.next(SkyMediaBreakpoints.sm);
      fixture.detectChanges();
      expect(component.showNewButtonText).toBeTruthy();
    });
  });

});