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
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">angular-calendar documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
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
                            <a href="changelog.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>CHANGELOG
                        </a>
                    </li>
                    <li class="link">
                            <a href="license.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>LICENSE
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/CalendarCommonModule.html" data-type="entity-link">CalendarCommonModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#directives-links-module-CalendarCommonModule-a0bb19444476f79efd9e0b5b5807a3bf"' : 'data-target="#xs-directives-links-module-CalendarCommonModule-a0bb19444476f79efd9e0b5b5807a3bf"' }>
                                    <span class="icon ion-md-code-working"></span>
                                    <span>Directives</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="directives-links-module-CalendarCommonModule-a0bb19444476f79efd9e0b5b5807a3bf"' : 'id="xs-directives-links-module-CalendarCommonModule-a0bb19444476f79efd9e0b5b5807a3bf"' }>
                                        <li class="link">
                                            <a href="directives/CalendarNextViewDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarNextViewDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/CalendarPreviousViewDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarPreviousViewDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/CalendarTodayDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarTodayDirective</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-CalendarCommonModule-a0bb19444476f79efd9e0b5b5807a3bf"' : 'data-target="#xs-pipes-links-module-CalendarCommonModule-a0bb19444476f79efd9e0b5b5807a3bf"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-CalendarCommonModule-a0bb19444476f79efd9e0b5b5807a3bf"' : 'id="xs-pipes-links-module-CalendarCommonModule-a0bb19444476f79efd9e0b5b5807a3bf"' }>
                                        <li class="link">
                                            <a href="pipes/CalendarDatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarDatePipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/CalendarDayModule.html" data-type="entity-link">CalendarDayModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-CalendarDayModule-38fd74308a8f03dd8505ce4731be040f"' : 'data-target="#xs-components-links-module-CalendarDayModule-38fd74308a8f03dd8505ce4731be040f"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-CalendarDayModule-38fd74308a8f03dd8505ce4731be040f"' : 'id="xs-components-links-module-CalendarDayModule-38fd74308a8f03dd8505ce4731be040f"' }>
                                        <li class="link">
                                            <a href="components/CalendarDayViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarDayViewComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/CalendarModule.html" data-type="entity-link">CalendarModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/CalendarMonthModule.html" data-type="entity-link">CalendarMonthModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-CalendarMonthModule-bf492ce20a0732aaf6b81e1e0aec4d5f"' : 'data-target="#xs-components-links-module-CalendarMonthModule-bf492ce20a0732aaf6b81e1e0aec4d5f"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-CalendarMonthModule-bf492ce20a0732aaf6b81e1e0aec4d5f"' : 'id="xs-components-links-module-CalendarMonthModule-bf492ce20a0732aaf6b81e1e0aec4d5f"' }>
                                        <li class="link">
                                            <a href="components/CalendarMonthViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarMonthViewComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/CalendarWeekModule.html" data-type="entity-link">CalendarWeekModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-CalendarWeekModule-ee35e7251eafdf8e96abdc08b1c64628"' : 'data-target="#xs-components-links-module-CalendarWeekModule-ee35e7251eafdf8e96abdc08b1c64628"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-CalendarWeekModule-ee35e7251eafdf8e96abdc08b1c64628"' : 'id="xs-components-links-module-CalendarWeekModule-ee35e7251eafdf8e96abdc08b1c64628"' }>
                                        <li class="link">
                                            <a href="components/CalendarWeekViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarWeekViewComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/CalendarEventTitleFormatter.html" data-type="entity-link">CalendarEventTitleFormatter</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/CalendarDateFormatter.html" data-type="entity-link">CalendarDateFormatter</a>
                            </li>
                            <li class="link">
                                <a href="injectables/CalendarMomentDateFormatter.html" data-type="entity-link">CalendarMomentDateFormatter</a>
                            </li>
                            <li class="link">
                                <a href="injectables/CalendarNativeDateFormatter.html" data-type="entity-link">CalendarNativeDateFormatter</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/CalendarDateFormatterInterface.html" data-type="entity-link">CalendarDateFormatterInterface</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/CalendarDayViewBeforeRenderEvent.html" data-type="entity-link">CalendarDayViewBeforeRenderEvent</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/CalendarEventTimesChangedEvent.html" data-type="entity-link">CalendarEventTimesChangedEvent</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/CalendarModuleConfig.html" data-type="entity-link">CalendarModuleConfig</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/CalendarMonthViewBeforeRenderEvent.html" data-type="entity-link">CalendarMonthViewBeforeRenderEvent</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/CalendarMonthViewEventTimesChangedEvent.html" data-type="entity-link">CalendarMonthViewEventTimesChangedEvent</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/CalendarWeekViewBeforeRenderEvent.html" data-type="entity-link">CalendarWeekViewBeforeRenderEvent</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/DateFormatterParams.html" data-type="entity-link">DateFormatterParams</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/DayViewEventResize.html" data-type="entity-link">DayViewEventResize</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/WeekViewAllDayEventResize.html" data-type="entity-link">WeekViewAllDayEventResize</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
