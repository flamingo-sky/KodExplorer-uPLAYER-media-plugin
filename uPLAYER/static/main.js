//uPlayer plugin to KodExplorer by Nathalis Cortex 2019 experimental media player.3

var uplaylist_filename="";
var uplaylist_url="";
var uplaylist_fileposter="";
var UPLAYER_instance;
var _uPlayerPlaylist_0;
 
 
var allText = ""; 
function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        allText = rawFile.responseText;
      }
    }
  }
  rawFile.send(null);
}
   
kodReady.push(function(){  
 	kodApp.add({
		name:"uPLAYER",
		title:LNG['Plugin.default.uPLAYER'],
		icon:'{{pluginHost}}static/uP_icon.png',
		ext:"{{config.fileExt}}",
		sort:"{{config.fileSort}}",  
    callback:function(path,ext){
      var url = '{{pluginApi}}&path='+core.pathCommon(path);          
        window.parent.uplaylist_url = core.path2url(path);
        window.parent.uplaylist_filename = window.parent.uplaylist_url.split('/').pop().split('#')[0].split('?')[0];    
        window.parent.uplaylist_fileposter = window.parent.uplaylist_url.replace(".mp3", ".jpg");     

//m3u file**********************************************************************
        var new_playlist=[]; 
        var ext = window.parent.uplaylist_url.split('.').pop();
        if (ext=="m3u") {
          readTextFile(window.parent.uplaylist_url);
          var playlist_lines = allText.split("\n");
          if (typeof window.parent.UPLAYER_instance !== "undefined" && window.parent.UPLAYER_instance.closed == false) {   
//------------------------------------------------------------------------------
//uPlayer is opened          
            for (i = 0; i < playlist_lines.length-1; i++) {
              window.parent.uplaylist_url=playlist_lines[i];
              window.parent.uplaylist_url=core.path2url(window.parent.uplaylist_url);
              window.parent.uplaylist_filename=decodeURIComponent(window.parent.uplaylist_url.split('/').pop().split('#')[0].split('?')[0]);
              window.parent.uplaylist_fileposter = window.parent.uplaylist_url.replace(".mp3", ".jpg");      
              extm =window.parent.uplaylist_url.split('.').pop();
              if (extm=="mp4")  var playlist_line = {title:window.parent.uplaylist_filename, artist:"", m4v:window.parent.uplaylist_url, poster:window.parent.uplaylist_fileposter};
              else var playlist_line = {title:window.parent.uplaylist_filename, artist:"", mp3:window.parent.uplaylist_url, poster:window.parent.uplaylist_fileposter};
              new_playlist.push(playlist_line);    
            }
            window.parent._uPlayerPlaylist_0.setPlaylist(new_playlist);   
          } else {     
//------------------------------------------------------------------------------
//uPlayer is not open
            window.parent.UPLAYER_instance=core.openDialog("{{pluginApi}}",core.icon('{{pluginHost}}static/uP_icon.png'),htmlEncode("uPLAYER"));
            window.parent.UPLAYER_instance._width="489px";
            window.parent.UPLAYER_instance.config.width="489px";
            window.parent.UPLAYER_instance._height="679px";
            window.parent.UPLAYER_instance.config.height="679px";
            window.parent.UPLAYER_instance.config.resize=false;
            window.parent.UPLAYER_instance.config.show=false;
            var UPUUID=(window.parent.UPLAYER_instance.config.id);
            var checkExist_uPlayer_b = setInterval(function() {
              if (typeof window.parent.UPLAYER_instance !== "undefined") {
                var i;
                for (i = 0; i < playlist_lines.length-1; i++) {
                  window.parent.uplaylist_url=playlist_lines[i];
                  window.parent.uplaylist_url=core.path2url(window.parent.uplaylist_url);
                  window.parent.uplaylist_filename=decodeURIComponent(window.parent.uplaylist_url.split('/').pop().split('#')[0].split('?')[0]);
                  window.parent.uplaylist_fileposter = window.parent.uplaylist_url.replace(".mp3", ".jpg");     
                  extm =window.parent.uplaylist_url.split('.').pop();
                  if (extm=="mp4")  var playlist_line = {title:window.parent.uplaylist_filename, artist:"", m4v:window.parent.uplaylist_url, poster:window.parent.uplaylist_fileposter};
                  else var playlist_line = {title:window.parent.uplaylist_filename, artist:"", mp3:window.parent.uplaylist_url, poster:window.parent.uplaylist_fileposter};
                  new_playlist.push(playlist_line);    
                }
                window.parent._uPlayerPlaylist_0.setPlaylist(new_playlist);    
		            clearInterval(checkExist_uPlayer_b);
              } 
            }, 200); // check every 100ms  
          } 
//------------------------------------------------------------------------------
        } else {
//mp3 or mp4 file***************************************************************
          window.parent.uplaylist_filename=decodeURIComponent(window.parent.uplaylist_filename);           
          if (typeof window.parent.UPLAYER_instance !== "undefined" && window.parent.UPLAYER_instance.closed == false) {   //uPLAYER is opened 
//------------------------------------------------------------------------------
//uPlayer is opened 
            window.parent.uplaylist_fileposter = window.parent.uplaylist_url.replace(".mp3", ".jpg");     
            if (ext=="mp4") window.parent._uPlayerPlaylist_0.add({
              title:window.parent.uplaylist_filename,
              artist:"",
              m4v:window.parent.uplaylist_url,
              poster: window.parent.uplaylist_fileposter
            }); else window.parent._uPlayerPlaylist_0.add({
              title:window.parent.uplaylist_filename,
              artist:"",
              mp3:window.parent.uplaylist_url,
              poster: window.parent.uplaylist_fileposter
            }); 
          } else {       
//------------------------------------------------------------------------------
//uPlayer is not open
            window.parent.UPLAYER_instance=core.openDialog("{{pluginApi}}",core.icon('{{pluginHost}}static/uP_icon.png'),htmlEncode("uPLAYER"));
            window.parent.UPLAYER_instance._width="489px";
            window.parent.UPLAYER_instance.config.width="489px";
            window.parent.UPLAYER_instance._height="679px";
            window.parent.UPLAYER_instance.config.height="679px";
            window.parent.UPLAYER_instance.config.resize=false;
            window.parent.UPLAYER_instance.config.show=false;
            var UPUUID=(window.parent.UPLAYER_instance.config.id);
            window.parent.UPLAYER_instance.config.left="80%";
            window.parent.UPLAYER_instance._left="80%";
            var checkExist_uPlayer = setInterval(function() {
              if (typeof window.parent.UPLAYER_instance !== "undefined") {
                window.parent.uplaylist_fileposter = window.parent.uplaylist_url.replace(".mp3", ".jpg");     
                if (ext=="mp4") window.parent._uPlayerPlaylist_0.add({
                  title:window.parent.uplaylist_filename,
                  artist:"", 
                  m4v:window.parent.uplaylist_url,
                  poster: window.parent.uplaylist_fileposter
                }); else window.parent._uPlayerPlaylist_0.add({
                  title:window.parent.uplaylist_filename,
                  artist:"", 
                  mp3:window.parent.uplaylist_url,
                  poster: window.parent.uplaylist_fileposter
                });  
		          clearInterval(checkExist_uPlayer);
            } 
          }, 200); // check every 100ms      
        }         
      } 
    },
  });

  var menuOpt = {
	  'play-media':{
			 name:LNG.add_to_play,
			 className:"play-media hidden",
			 icon:"x-item-file x-mp3",
			 accesskey: "p",
			 callback:function(action,option){
			   if (ui.fileLight.fileListSelect().length <1) return;
			   var list = []; //add to playlist
				 ui.fileLight.fileListSelect().each(function(index){
					 var ext = ui.fileLight.type($(this));
					 if ( kodApp.appSupportCheck('uPLAYER',ext) ) {
						 var path = ui.fileLight.path($(this)); 
						 var url = core.path2url(path,true);
						 list.push({
						 	 url:url,
							 name:core.pathThis(path),
							 ext:ext
						 });
					 } 
			   });
 //add to playlist**************************************************************       

        if (typeof window.parent.UPLAYER_instance !== "undefined" && window.parent.UPLAYER_instance.closed == false) {   
//------------------------------------------------------------------------------
//uPlayer is opened 
          var i;
          for (i = 0; i < list.length; ++i) {
            window.parent.uplaylist_url=list[i]["url"];
            window.parent.uplaylist_filename=list[i]["name"];
            window.parent.uplaylist_fileposter = window.parent.uplaylist_url.replace(".mp3", ".jpg");     
            window.parent._uPlayerPlaylist_0.add({
              title:window.parent.uplaylist_filename,
              artist:"",
              mp3:window.parent.uplaylist_url,
              poster: window.parent.uplaylist_fileposter
            }); 
          }
        } else { 
//------------------------------------------------------------------------------
//uPlayer is not open
          window.parent.UPLAYER_instance=core.openDialog("{{pluginApi}}",core.icon('{{pluginHost}}static/uP_icon.png'),htmlEncode("uPLAYER"));
          window.parent.UPLAYER_instance._width="489px";
          window.parent.UPLAYER_instance.config.width="489px";
          window.parent.UPLAYER_instance._height="679px";
          window.parent.UPLAYER_instance.config.height="679px";
          window.parent.UPLAYER_instance.config.resize=false;
          window.parent.UPLAYER_instance.config.show=false;
          var UPUUID=(window.parent.UPLAYER_instance.config.id);
          var new_playlist=[];          
          var checkExist_uPlayer_a = setInterval(function() {
          if (typeof window.parent.UPLAYER_instance !== "undefined") {
            var i;
            for (i = 0; i < list.length; i++) {
              window.parent.uplaylist_url=list[i]["url"];
              window.parent.uplaylist_filename=list[i]["name"]; 
              window.parent.uplaylist_fileposter = window.parent.uplaylist_url.replace(".mp3", ".jpg");     
              var playlist_line = {title:window.parent.uplaylist_filename, artist:"", mp3:window.parent.uplaylist_url, poster:window.parent.uplaylist_fileposter};
              new_playlist.push(playlist_line);    
            }
            window.parent._uPlayerPlaylist_0.setPlaylist(new_playlist);    
		        clearInterval(checkExist_uPlayer_a);
           } 
         }, 200); // check every 100ms                   
        }
			}
		}
	}
	$.contextMenu.menuAdd(menuOpt,'.menu-more',false,'.clone');
  
	Hook.bind('rightMenu.show.menu-more',function($menuAt,$theMenu){
		var needMenu  = 0;
		var hideClass = 'hidden';
		ui.fileLight.fileListSelect().each(function(){
			var ext = core.pathExt(ui.fileLight.name($(this)));
			if ( kodApp.appSupportCheck('uPLAYER',ext) ){
				needMenu +=1;
			}
		});
		if(needMenu == 0){
			$theMenu.find('.play-media').addClass(hideClass);
		}else{
			$theMenu.find('.play-media').removeClass(hideClass);
		}
	});
});
 
//==============================================================================
function SavePlaylist() {    
  core.api.pathSelect(
	  {type:'folder',title:'save playlist'},
		function(path){
			var playlist_data="";
      var tmp=0;
      for (tmp=0;tmp<window.parent._uPlayerPlaylist_0.playlist.length;tmp++) {
        var playlist_url=window.parent._uPlayerPlaylist_0.playlist[tmp].mp3;
        if (typeof playlist_url == "undefined" ) playlist_url=window.parent._uPlayerPlaylist_0.playlist[tmp].m4v;
        playlist_data=playlist_data+playlist_url+"\n";
      }
      var request = '{{pluginApi}}playlist_saver';   
      $.ajax({
			  url:request,
				dataType:'json',
        type: 'post',          
				beforeSend: function(){
			},
				error:core.ajaxError,
				success:function(data){
        console.log("save_playlist_ok.");
			},
      data:{path:path,playlistdata:playlist_data}       
		});  
  }); 
}

//******************************************************************************
//by Nathalis Cortex :) 2019
