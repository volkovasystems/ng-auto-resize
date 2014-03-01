try{ var base = window; }catch( error ){ base = exports; }
( function module( base ){
	define( "autoResizeDirective",
		[
			"angular",
			"jquery",
			"safeApply",
			"bindDOM",
			"amplify"
		],
		function construct( ){
			var autoResizeDirective = function autoResizeDirective( moduleNamespace ){
				safeApplyFactory( moduleNamespace );
				bindDOMFactory( moduleNamespace );
				angular.module( moduleNamespace )
					.directive( "autoResize",
						[
							"safeApply",
							"bindDOM",
							function construct( safeApply ){
								return {
									"restrict": "A",
									"scope": true,
									"link": function link( scope, element, attribute ){
										safeApply( scope );
										bindDOM( scope, element, attribute );
										scope.parentElement = scope.element.parent( );
										var eventName = "on-resize:" + scope.name;
										$( window ).resize( function onResize( event ){
											var eventData = {
												"scope": scope,
												"event": event
											};
											amplify.publish( eventName, eventData );
											scope.$emit( eventName, eventData );
										} );
									}
								};
							}
						] );
			};
			base.autorResizeDirective =  autorResizeDirective;
			return autorResizeDirective;
		} );
} )( base );