$(document).ready(function() {
  var prop;
	
	var facts = {
		payung: {
			icon: "http://placehold.it/250x250",
			fact: "<h1>Selamat Anda Mendapat Payung</h1>"
		},
		goodybag: {
			icon: "http://placehold.it/250x250",
			fact: "<h1>Selamat Anda Mendapat Goodybag</h1>"
		},
		kaos: {
			icon: "http://placehold.it/250x250",
			fact: "<h1>Selamat Anda Mendapat Kaos</h1>"
		},
		mousepad: {
			icon: "http://placehold.it/250x250",
			fact: "<h1>Selamat Anda Mendapat Mousepad</h1>"
		},
		mug: {
			icon: "http://placehold.it/250x250",
			fact: "<h1>Selamat Anda Mendapat Mug</h1>"
		},
		note: {
			icon: "http://placehold.it/250x250",
			fact: "<h1>Selamat Anda Mendapat Note</h1>"
		},
		bantal: {
			icon: "http://placehold.it/250x250",
			fact: "<h1>Selamat Anda Mendapat Bantal</h1>"
		},
		kalah: {
			icon: "http://placehold.it/250x250/E8117F/FFFFFF",
			fact: "<h1>Yah Belum Beruntung</h1>"
		},
		cobalagi: {
			icon: "http://placehold.it/250x250",
			fact: "<h1>Coba sekali lagi siapa tau beruntung</h1>"
		}

	};
	
	var init = function() {
		prop = $(".roulette .wheel").propeller({
			inertia: .97,
			onStop: function() {
			},
			onRotate: function() {
				updateIconHighlight();
				setFact();
			}
		});
		
		updateIconHighlight();
		setFact();
	}
	
	var findIconsInWheel = function() {
		var svgDoc = $(".wheel svg").get(0);
		
		var $icons = $();
		
		$(svgDoc.getElementsByTagName("path")).each(function(){
			var $path = $(this);
			
			if (!$path.attr("fill") == "#FFFFFF" && !$path.attr("opacity") == "0.5") {
				return;
			}
			
			var id = $path.attr("id");
			var $icon;
			if (id) 
			{
				$icon = $path;
			} 
			else 
			{
				id = $path.parent().attr("id");
				
				if (id) {
					$icon = $path.parent();
				}
			}
			
			if (id && $icon && $icon.length > 0) 
			{
				if (id.indexOf("SVGID") > -1) {
					return;
				}
				
				$icons = $icons.add($icon);
			}
			
		});
		
		return $icons;
	}
	
	var findSegments = function() {
		var svgDoc = $(".wheel svg").get(0);
		var $groups = $(svgDoc.getElementsByTagName("g"));
		
		var $segmentGroup = $groups.first(function() {
			var $g = $(this);
			var cp = $g.attr("clip-path");
			if ($g.is("[clip-path]") && cp && cp.indexOf("SVGID_2") >= 0) {
				return true;
			}
			
			return false;
		});
		
		return $segmentGroup.find("path[fill]");
	}
	
	var updateIconHighlight = function() 
	{
		var $icons = findIconsInWheel();
		var $pointer = $(".roulette .pointer .tip");
		
		$icons
			.attr("opacity", "0.5");
		$icons
			.filter("g").children().attr("opacity", "0.5");
		
		var $closest = $pointer.nearest($icons).first();
		
		$closest
			.attr("opacity", "1");
		$closest
			.filter("g").children().attr("opacity", "1");
		
	}
	
	var setFact = function() 
	{
		var $icons = findIconsInWheel();
		var $pointer = $(".roulette .pointer .tip");
		
		var $closest = $pointer.nearest($icons).first();
		
		var id = $closest.attr("id");
		
		$("#factImg").hide();
		$("#factDesc").hide();
		
		if (id) 
		{
			var fact = facts[id];
			
			if (fact) 
			{
				if (fact.icon) {
					$("#factImg").attr("src", fact.icon).show();
				}
				
				if (fact.fact) {
					$("#factDesc").html(fact.fact).show();
				}
			}
		}
	}
	
	init();
});