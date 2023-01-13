app.LoadPlugin( "UIExtras" );
cfg.MUI
cfg.Light

function OnStart()
{
notepad()
app.EnableBackKey( OnBack );
}
function notepad()
{
 lay = app.CreateLayout( "Linear", "FillXY" );
 lay.SetBackColor( "#cc22cc" )

 txt = app.CreateText( "Note Pad", 1.0 );
 txt.SetTextSize( 28 );
 txt.SetTextColor( "#FFFFFF" );
 txt.SetPadding( 0, 0.01, 0, 0.01 );
 txt.SetBackColor( "#1cbcff" );
 lay.AddChild( txt );

var txtList = app.ListFolder( "/sdcard/DCIM", ".txt");

var data = txtList 

  lst = app.CreateList( data, 1,1)
  lst.SetBackColor( "white" )
  lst.SetTextColor( "blue" )
  lst.SetOnTouch( nots );
  lay.AddChild( lst );

 app.AddLayout(lay)
 
 uix = app.CreateUIExtras();

 layFab = app.CreateLayout( "Linear", "FillXY, Bottom, Right, TouchThrough" );
 fab = uix.CreateFAButton( "[fa-pencil]" );
 fab.SetMargins( 0.02, 0.01, 0.02, 0.01 );
 fab.SetButtonColors( "blue", "#c33d32" );
 fab.SetOnTouch( fab_OnTouch );
 layFab.AddChild( fab );

 layFab2 = app.CreateLayout( "Linear", "FillXY, Bottom, Left,  TouchThrough" );
 fab2 = uix.CreateFAButton( "[fa-list]" );
 fab2.SetMargins( 0.02, 0.01, 0.02, 0.01 );
 fab2.SetButtonColors( "gray", "#c33d32" );
 fab2.SetOnTouch( onlist );
 layFab2.AddChild( fab2 );

 app.AddLayout( layFab );
 app.AddLayout( layFab2 );

 app.ShowPopup( "Press the FAButton to add notes" );
}
function fab_OnTouch()
{
 dlg = app.CreateDialog( "New Note" );

 dlgLay = app.CreateLayout( "Linear", "Vertical, FillXY" );
 dlgLay.SetPadding( 0.02, 0, 0.02, 0.02 );
 dlg.AddLayout( dlgLay );

dlgTtl = app.CreateTextEdit( "", 0.8,0.05, "SingleLine,AutoSize" );
 dlgTtl.SetHint( "Enter Title..." );
 dlgTtl.SetBackColor( "white" )
 dlgTtl.SetTextColor( "black" )
 dlgLay.AddChild( dlgTtl );

div = MUI.CreateDivider( 4 )
dlgLay.AddChild( div )

 dlgTxt = app.CreateTextEdit( "", 0.8, 0.5, "Multiline" );
 dlgTxt.SetHint( "Enter notes..." );
 dlgTxt.SetBackColor( "white" )
 dlgTxt.SetTextColor( "black" )
 dlgLay.AddChild( dlgTxt );

 dlgBtn = app.CreateButton( "Save", 0.2,0.07 );
 dlgBtn.SetOnTouch( dlgBtn_OnTouch );
 dlgLay.AddChild( dlgBtn );

 dlg.Show();
}
function dlgBtn_OnTouch()
{
  var title = dlgTtl.GetText()
  var txt = dlgTxt.GetText()

	app.WriteFile( "/sdcard/DCIM/"+title+".txt", txt )

 notepad()
 dlg.Dismiss();
}
function nots(title,index)
{
 var vw = app.ReadFile( "/sdcard/DCIM/"+title )

 dlg = app.CreateDialog( title );

 dlgLay = app.CreateLayout( "Linear", "Vertical, FillXY" );
 dlgLay.SetPadding( 0.02, 0, 0.02, 0.02 );
 dlg.AddLayout( dlgLay );

dlgTtl = app.CreateTextEdit( "", 0.8,0.05, "SingleLine,AutoSize" );
 dlgTtl.SetHint( "Enter Title..." );
 dlgTtl.SetBackColor( "white" )
 dlgTtl.SetTextColor( "black" )
 dlgLay.AddChild( dlgTtl );

div = MUI.CreateDivider( 4 )
dlgLay.AddChild( div )

 dlgTxt = app.CreateTextEdit( "", 0.8, 0.5, "Multiline" );
 dlgTxt.SetHint( "Enter notes..." );
 dlgTxt.SetBackColor( "white" )
 dlgTxt.SetTextColor( "black" )
 dlgLay.AddChild( dlgTxt );

dlgTtl.SetText( title )
dlgTxt.SetText( vw )

btns = app.CreateLayout( "Linear", "Horizontal" );

 cncl = app.CreateButton( "Cancel", 0.2,0.07 );
 cncl.SetOnTouch( cancelo );
 btns.AddChild( cncl );

 dlgBtn = app.CreateButton( "Save", 0.2,0.07 );
 dlgBtn.SetOnTouch( dlgBtn_OnTouch );
 btns.AddChild( dlgBtn );

dlgLay.AddChild( btns )

 dlg.Show();
}
function cancelo()
{
 dlg.Dismiss();
}
function on_delete(item, title, index)
{
title = lst.GetSelected()
app.DeleteFile( title )
}
function onlist()
{
   color = MUI.colors.teal
    app.InitializeUIKit(color.Lighten7)

    var list = ["Settings:settings", "Share App:share", "Rate Us:star", "Send Report:mail", "About:laptop"]
           lst = MUI.CreateMenuWithIcon(list, null, null, "bottom, Center")
           lst.SetOnSelect( onselect )

    lst.Show()
}
function onselect(choice, index)
{
switch (choice)
{
case "Settings":
dlg = app.CreateDialog( choice );

    color = MUI.colors.teal
    app.InitializeUIKit(color.teal)

    lay = MUI.CreateLayout("Linear", "FillXY,VCenter")
    dlg.AddLayout(lay)

        var settings = [
            "Premium mode",
            "Enable dark mode",
            "Disable full screen"
        ]

        for(var i=0; i<settings.length; i++)
        {
            skb = MUI.CreateSwitchSettings(settings[i], 1)
            skb.SetOnTouch(onsetting)
            lay.AddChild(skb)
            lay.AddChild(MUI.CreateDivider())
        }
 dlg.Show();
break

case "Share App":
app.SendText("It's simple, and secure app we can use to save notes and memos for free. Get it at https://play.google.com/store/apps/details?id=com.zigtech.notepad", "Notepad", "Choose an app");
break

case "Rate Us":
app.CreatePlayStore()
break

case "Send Report":
  var packageName = "com.google.android.gm";
    var className = "com.google.android.gm.ComposeActivityGmailExternal";
    var action = "android.intent.action.VIEW";
    var category = null;
    var uri = "alphazigy@outlook.com";
    var type = "message/rfc822";
    
    var extras = [ 
        {name:"android.intent.extra.EMAIL", type:"list", value:"alphazigy@outlook.com"},
        {name:"android.intent.extra.SUBJECT", type:"string", value:"Report: "},
        {name:"android.intent.extra.TEXT", type:"string", value:"Please tell us your issue\nPlease attach a screenshot"} 
    ];
    extras = JSON.stringify( extras )

    app.SendIntent( packageName, className, action, category, uri, type, extras ) 
break

case "About":
    color = MUI.colors.teal
    app.InitializeUIKit(color.teal)

    lay = MUI.CreateLayout("Linear", "FillXY")
    hdr = MUI.CreateAppBar("About Developer", "reply_all", "close")    
    hdr.SetOnMenuTouch(notepad)
    hdr.GetTop(1)
    hdr.SetOnControlTouch(onclose)
    lay.AddChild( hdr )

  sr = app.CreateScroller( "wrap" )
lay.AddChild( sr )
  layy = MUI.CreateLayout("Linear", "VCenter")
  layy.SetPadding(0, 0.02, 0, 0.02)
            layy.SetSize(1)
        var options = {
            title: "ZigTech",
            body: "Developed by Alpha Zigara\nalphazigy@outlook.com\n\nZigTech©2023\n\n\nLisenced under Apahe Licences\nhttp://www.apache.org/licences/",
            buttonText: "Call: +263 78 544 7337,Whatsapp: +263 71 786 5911",
            image: "/Sys/Img/Sky.jpg",
            width: 0.94,
            avatar: "Img/Notepad.png",
            avatarOnTop: true,
            divider1: true,
            divider2: true,
        }
        var card = UI.CreateCard(options)
        card.SetOnButtonTouch( calldev )
        layy.AddChild(card)
        sr.AddChild( layy )

    app.AddLayout(lay)
break
}
}
function onsetting(text, value)
{
    app.ShowPopup(text+" : "+value)
}
function onclose()
{
notepad();
}
function OnBack()
{
    if( file.IsVisible() ) {
        curMenu = "Home";
        ChangePage( home, curMenu );
    }
    else {
        var yesNo = app.CreateYesNoDialog( "Exit the app?" );
    	yesNo.SetOnTouch( function(result){ if(result=="Yes") app.Exit()} );
    	yesNo.Show();
    }
}
function yesNo_OnTouch( selection )
{
    if( selection =="Yes" ) app.Exit();
    if( selection =="No" ) home();
    
}
function calldev( btnText ) 
{
app.Call( "+263 78 544 7337" );
}