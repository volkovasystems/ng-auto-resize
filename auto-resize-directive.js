try{ var base = window; }catch( error ){ base = exports; }
( function module( base ){
	define( "autoResizeDirective",
		[
			"angular",
			"amplify",
			"arbiter"
		],
		function construct( ){
			var registeredEvents = { };
			var registeredModule;

			var autoResizeDirective = function autoResizeDirective( moduleNamespace ){
				if( registeredModule ){
					return;
				}

				registeredModule = moduleNamespace;
				
				appDetermine( moduleNamespace )
					.directive( "autoResize",
						[
							"$timeout",
							function construct( $timeout ){
								return {
									"restrict": "A",
									"priority": 2,
									"scope": true,
									"link": function link( scope, element, attribute ){
										$timeout( function onRender( ){
											var namespace = attribute[ "namespace" ];
											var eventName = "on-resize:" + namespace;

											if( eventName in registeredEvents ){
												return;
											}else{
												registeredEvents[ eventName ] = scope;
											}

											$( window ).resize( function onResize( event ){
												Arbiter.publish( eventName );
											} );
											
											Arbiter.subscribe( eventName,
												function handler( eventData ){
													amplify.publish( eventName )
												} );
											
											Arbiter.publish( eventName, null, { "persist": true } );
										}, 0 );
									}
								};
							}
						] );
			};
			base.autoResizeDirective =  autoResizeDirective;
			return autoResizeDirective;
		} );
} )( base );