{
  /* <div class="o-header__row o-header__top" data-trackable="header-sticky">
	<div class="o-header__container">
		<div class="o-header__top-wrapper">

			<div class="o-header__top-column o-header__top-column--left">
				<a href="#" class="o-header__top-link o-header__top-link--menu" aria-controls="o-header-drawer" data-trackable="drawer-toggle" tabindex="-1">
					<span class="o-header__top-link-label">Menu</span>
				</a>
				<a href="#" class="o-header__top-link o-header__top-link--search" aria-controls="o-header-search-sticky" data-trackable="search-toggle" tabindex="-1">
					<span class="o-header__top-link-label">Search</span>
				</a>
			</div>

			<div class="o-header__top-column o-header__top-column--center">
				{{!-- navigation (shown on large screens) --}}
				<div class="o-header__top-takeover">
					<div class="o-header__nav">
						<ul class="o-header__nav-list o-header__nav-list--left" data-trackable="primary-nav">
							{{#each @root.navigation.menus.navbar.items}}
							<li class="o-header__nav-item">
								<a class="o-header__nav-link o-header__nav-link--primary {
                  {#ifEquals @root.currentNav.topLevelRelative.href url}}
                    o-header-nav__list-link--highlight
                  {{/ifEquals}}" href="{{url}}"
                  data-trackable="{{label}}"
                  tabindex="-1">{{label}}
                </a>
							</li>
							{{/each}}
						</ul>
					</div>
				</div>

				{{!-- logo (hidden on large screens) --}}
				<a class="o-header__top-logo o-header__hide--L" data-trackable="logo" href="/" title="Go to Financial Times homepage" tabindex="-1">
					<span class="o-header__visually-hidden">Financial Times</span>
				</a>
			</div>

			<div class="o-header__top-column o-header__top-column--right">
				{{#if @root.anon.userIsAnonymous}}
					{{#unlessEquals nUi.header.userNav false}}
						<div class="o-header__nav">
							<ul class="o-header__nav-list o-header__nav-list--right" data-trackable="user-nav">
								{{#outputBlock 'mobile-sticky-header'}}{{/outputBlock}}
								{{#each @root.navigation.menus.navbar-right-anon.items}}
									<li class="o-header__nav-item {{#ifEquals label 'Subscribe'}}o-header__nav-item--expanded{{/ifEquals}}">
										<a
											class="o-header__nav-{{#ifEquals label 'Subscribe'}}button{{else}}link{{/ifEquals}}"
											href="{{url}}"
											data-trackable="{{label}}"
											tabindex="-1"
										>
											{{label}}
										</a>
									</li>
								{{/each}}
							</ul>
						</div>
					{{/unlessEquals}}
				{{/if}}

				{{#if @root.anon.userIsLoggedIn}}
					{{#outputBlock 'mobile-sticky-header'}}{{/outputBlock}}
					<a class="o-header__top-link o-header__top-link--myft" href="/myft" data-trackable="my-ft" tabindex="-1">
						<span class="o-header__visually-hidden">myFT</span>
					</a>
				{{/if}}
			</div>

		</div>
	</div>
</div> */
}
