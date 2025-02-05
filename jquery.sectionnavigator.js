/**
 * jQuery Multi-Step Section Plugin v1.0
 * @author Michael Peacock
 * @url www.michaelpeacock.co.uk
 * @modified_by Zach Morek
 * @m_url www.zachbeta.com
 */
(function($) {
	$.fn.sectionnavigator = function( settings ) {
		
		var config = {'nextclass' : 'next', 'prevclass' : 'prev', 'master_nav_heading' : 'h2' };
		var masterReference = $(this).attr('id');
		if (settings) $.extend(config, settings);
		
		//put in top bar nav
		$(this).parent().prepend('<div id="' + masterReference + '_navigator" style="display:none"></div>');

		//create numbered links with names
		$(this).children().each( function(index){ 
			if($('#' + masterReference + '_navigator').html() != ""){
				$('#' + masterReference + '_navigator').append(' | ');
			}	
			$('#' + masterReference + '_navigator').append('<a stylehref="#" class="mnav_link" rel="sn_section_' + masterReference + '_' 
            + (index) + '">' + (index +1)+": " + $(this).attr("name")  + '</a>');
		});	
		
		
		//put in next and prev buttons
		$(this).children().each( function(index){ 
			$(this).attr('id','sn_section_' + masterReference + '_' + index ); 
			$(this).prepend('<div class="' + masterReference + '_navigation" style="min-height:26px;"><input type="button" value="Previous" class="prev" />'
            + $('#' + masterReference + '_navigator').html() +' <input type="button" value="Next" class="next" style="float:right;" /></div>');	
		});
		
		$('.mnav_link').live( 'click', function(){ 	
			$('#' + masterReference ).children().hide();
			$( '#' + $(this).attr('rel') ).show();
			return false;	
		});
		
		$('#' + masterReference + '_preview').live( 'click', function(){
			$('#' + masterReference).children().show();	
			$('.' + masterReference + '_navigation').hide();
			$('#' + masterReference + '_navigator').hide();
			$(this).hide();
			return false;
			
		});
		
        $(this).children().hide();
        $(this).children().first().show();

        //attach prev/next buttons
		$('.' + config.nextclass ).on( 'click', function(){
			$(this).parent().parent().hide().next().show();
			return false;
		} );
		$('.' + config.prevclass ).on( 'click', function(){
			$(this).parent().parent().hide().prev().show();
			return false;
		} );
        //exception for first and last
		$( ' .section:last .' + config.nextclass , this ).off( 'click' );
		$( ' .section:last .' + config.nextclass , this ).attr("disabled", true);
        $( ' .section:first .' + config.prevclass, this ).off( 'click' );				  
        $( ' .section:first .' + config.prevclass, this ).attr("disabled", true);
		return this;
		
	};
})(jQuery);
