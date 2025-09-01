'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">angular-calendar documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/CalendarCommonModule.html" data-type="entity-link" class="deprecated-name">CalendarCommonModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-CalendarCommonModule-b0ab33c3339c125211ac817ed15f127be51b4f392cd0559a511534d60ace0108575d8419cde13796dc6e5e4b55f6c963e23f27f92613361133dbb74c4ecfe78d"' : 'data-bs-target="#xs-directives-links-module-CalendarCommonModule-b0ab33c3339c125211ac817ed15f127be51b4f392cd0559a511534d60ace0108575d8419cde13796dc6e5e4b55f6c963e23f27f92613361133dbb74c4ecfe78d"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-CalendarCommonModule-b0ab33c3339c125211ac817ed15f127be51b4f392cd0559a511534d60ace0108575d8419cde13796dc6e5e4b55f6c963e23f27f92613361133dbb74c4ecfe78d"' :
                                        'id="xs-directives-links-module-CalendarCommonModule-b0ab33c3339c125211ac817ed15f127be51b4f392cd0559a511534d60ace0108575d8419cde13796dc6e5e4b55f6c963e23f27f92613361133dbb74c4ecfe78d"' }>
                                        <li class="link">
                                            <a href="directives/CalendarNextViewDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarNextViewDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/CalendarPreviousViewDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarPreviousViewDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/CalendarTodayDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarTodayDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-CalendarCommonModule-b0ab33c3339c125211ac817ed15f127be51b4f392cd0559a511534d60ace0108575d8419cde13796dc6e5e4b55f6c963e23f27f92613361133dbb74c4ecfe78d"' : 'data-bs-target="#xs-pipes-links-module-CalendarCommonModule-b0ab33c3339c125211ac817ed15f127be51b4f392cd0559a511534d60ace0108575d8419cde13796dc6e5e4b55f6c963e23f27f92613361133dbb74c4ecfe78d"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-CalendarCommonModule-b0ab33c3339c125211ac817ed15f127be51b4f392cd0559a511534d60ace0108575d8419cde13796dc6e5e4b55f6c963e23f27f92613361133dbb74c4ecfe78d"' :
                                            'id="xs-pipes-links-module-CalendarCommonModule-b0ab33c3339c125211ac817ed15f127be51b4f392cd0559a511534d60ace0108575d8419cde13796dc6e5e4b55f6c963e23f27f92613361133dbb74c4ecfe78d"' }>
                                            <li class="link">
                                                <a href="pipes/CalendarDatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarDatePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CalendarDayModule.html" data-type="entity-link" class="deprecated-name">CalendarDayModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CalendarDayModule-d0fd17d575707668f07c93ea2f188a2512c9c3dc9d2d1942bb50896c8e56e9b81394deb2bd3c3b3fa402f1b66590e9d42dd9b7b36588bdaa619c43ca8bb99e81"' : 'data-bs-target="#xs-components-links-module-CalendarDayModule-d0fd17d575707668f07c93ea2f188a2512c9c3dc9d2d1942bb50896c8e56e9b81394deb2bd3c3b3fa402f1b66590e9d42dd9b7b36588bdaa619c43ca8bb99e81"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CalendarDayModule-d0fd17d575707668f07c93ea2f188a2512c9c3dc9d2d1942bb50896c8e56e9b81394deb2bd3c3b3fa402f1b66590e9d42dd9b7b36588bdaa619c43ca8bb99e81"' :
                                            'id="xs-components-links-module-CalendarDayModule-d0fd17d575707668f07c93ea2f188a2512c9c3dc9d2d1942bb50896c8e56e9b81394deb2bd3c3b3fa402f1b66590e9d42dd9b7b36588bdaa619c43ca8bb99e81"' }>
                                            <li class="link">
                                                <a href="components/CalendarDayViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarDayViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CalendarModule.html" data-type="entity-link" class="deprecated-name">CalendarModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CalendarMonthModule.html" data-type="entity-link" class="deprecated-name">CalendarMonthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CalendarMonthModule-111a709be4bf89782a06542fff7620358db1949dfa093b3bd6fc0c653609c4fe2b7cd8e131835f1cf5966270a659a7faa51977bc4ada4297f78b6b318e2bde4e"' : 'data-bs-target="#xs-components-links-module-CalendarMonthModule-111a709be4bf89782a06542fff7620358db1949dfa093b3bd6fc0c653609c4fe2b7cd8e131835f1cf5966270a659a7faa51977bc4ada4297f78b6b318e2bde4e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CalendarMonthModule-111a709be4bf89782a06542fff7620358db1949dfa093b3bd6fc0c653609c4fe2b7cd8e131835f1cf5966270a659a7faa51977bc4ada4297f78b6b318e2bde4e"' :
                                            'id="xs-components-links-module-CalendarMonthModule-111a709be4bf89782a06542fff7620358db1949dfa093b3bd6fc0c653609c4fe2b7cd8e131835f1cf5966270a659a7faa51977bc4ada4297f78b6b318e2bde4e"' }>
                                            <li class="link">
                                                <a href="components/CalendarMonthViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarMonthViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CalendarWeekModule.html" data-type="entity-link" class="deprecated-name">CalendarWeekModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CalendarWeekModule-b3f77a4bec7b2b5cc095efaf09228421fe23427a2abbba081bcff8e7075a1ef57428567a903da68f94c9e22cabc9d44119ccc0601f077d5bacbbf28aac08981c"' : 'data-bs-target="#xs-components-links-module-CalendarWeekModule-b3f77a4bec7b2b5cc095efaf09228421fe23427a2abbba081bcff8e7075a1ef57428567a903da68f94c9e22cabc9d44119ccc0601f077d5bacbbf28aac08981c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CalendarWeekModule-b3f77a4bec7b2b5cc095efaf09228421fe23427a2abbba081bcff8e7075a1ef57428567a903da68f94c9e22cabc9d44119ccc0601f077d5bacbbf28aac08981c"' :
                                            'id="xs-components-links-module-CalendarWeekModule-b3f77a4bec7b2b5cc095efaf09228421fe23427a2abbba081bcff8e7075a1ef57428567a903da68f94c9e22cabc9d44119ccc0601f077d5bacbbf28aac08981c"' }>
                                            <li class="link">
                                                <a href="components/CalendarWeekViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarWeekViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/CalendarDayViewComponent.html" data-type="entity-link" >CalendarDayViewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CalendarMonthViewComponent.html" data-type="entity-link" >CalendarMonthViewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CalendarWeekViewComponent.html" data-type="entity-link" >CalendarWeekViewComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/CalendarNextViewDirective.html" data-type="entity-link" >CalendarNextViewDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/CalendarPreviousViewDirective.html" data-type="entity-link" >CalendarPreviousViewDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/CalendarTodayDirective.html" data-type="entity-link" >CalendarTodayDirective</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CalendarEventTitleFormatter.html" data-type="entity-link" >CalendarEventTitleFormatter</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CalendarDateFormatter.html" data-type="entity-link" >CalendarDateFormatter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CalendarMomentDateFormatter.html" data-type="entity-link" >CalendarMomentDateFormatter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CalendarNativeDateFormatter.html" data-type="entity-link" >CalendarNativeDateFormatter</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CalendarDateFormatterInterface.html" data-type="entity-link" >CalendarDateFormatterInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CalendarEventTimesChangedEvent.html" data-type="entity-link" >CalendarEventTimesChangedEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CalendarMonthViewBeforeRenderEvent.html" data-type="entity-link" >CalendarMonthViewBeforeRenderEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CalendarMonthViewEventTimesChangedEvent.html" data-type="entity-link" >CalendarMonthViewEventTimesChangedEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CalendarWeekViewBeforeRenderEvent.html" data-type="entity-link" >CalendarWeekViewBeforeRenderEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DateFormatterParams.html" data-type="entity-link" >DateFormatterParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WeekViewAllDayEventResize.html" data-type="entity-link" >WeekViewAllDayEventResize</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/CalendarDatePipe.html" data-type="entity-link" >CalendarDatePipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});