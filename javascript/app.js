var viewDisplay = document.getElementById("view-area");
var codeArea = document.getElementById("code-area");
var editArea = document.getElementById("edit-area");

// 变化的值 初始化 全局变量存储
// var topOffset = 0,
// 	rightOffset = 0,
// 	bottomOffset = 0,
// 	leftOffset = 0,
var objOffset = {
		"topOffset" : 0,
		"rightOffset" : 0,
		"bottomOffset" : 0,
		"leftOffset" : 0
	},
	sliceWidth = 27, // 偏移量 一般没有单位 或者使用百分比
	fill = false,
	borderWidth = "27px", // 边框图片宽度 需要单位
	verRepeat = "stretch",
	horRepeat = "stretch";

// 前缀补充
var arrBeforeTag = ["-moz-", "-webkit-", "-o-"];

var setCss = "";

// 默认状态下 边框宽度 = border-image-slice = 27px 
// 官方事例图片 81px * 81px
window.onload = function(){
	reDraw();

	var inputArr = editArea.getElementsByTagName("input");
	for(var i = 0, length = 3; i <= length; i++){
		addEvent(inputArr[i], "change", rangeListener);
	}

	addEvent(inputArr[4], "change", checkBoxListener);
	addEvent(inputArr[5], "keyup", sliceWidthListener);
	addEvent(inputArr[6], "keyup", borderWidthListener);

	addEvent(document.getElementById("ver-rep"), "change", verRepeatListener);
	addEvent(document.getElementById("hor-rep"), "change", horRepeatListener);
};

// 画面重绘函数
function reDraw(){
	setCss = "width: 100px; height: 100px; border: 2px solid black; box-sizing: content-box;";
	for(var i = 0, length = arrBeforeTag.length; i < length; i++){
		setCss += arrBeforeTag[i] + "border-image: url(border.png) " + sliceWidth + (fill == true ? " fill" : "") + "/ " + borderWidth + "/ ";
		for(var j in objOffset){
			setCss += objOffset[j] + " ";
		}
		setCss += horRepeat + " " + verRepeat + "; ";
	}
	setCss += "border-image: url(border.png) " + sliceWidth + (fill == true ? " fill" : "") + "/ " + borderWidth + "/ ";
	for(var i in objOffset){
		setCss += objOffset[i] + " ";
	}
	setCss += horRepeat + " " + verRepeat + "; ";
	viewDisplay.setAttribute("style", setCss);
	serializeCode(setCss); 
}

// 序列化输出
function serializeCode(code){
	var _arrCode = code.split(";");
	var _outCode = "";
	for(var i = 0, length = _arrCode.length; i < length; i++){
		if(_arrCode[i].trim() != ""){
			_outCode += _arrCode[i] + ";<br />";
		}
	}
	codeArea.innerHTML = _outCode;
}

// 兼容的事件监听事件
function addEvent(node, type, handler){
	if(!node) return false;
	if(node.addEventListener){
		node.addEventListener(type, handler, false);
		return true;
	}else if(node.attachEvent){
		node.attachEvent('on' + type, function(){
			handler.apply(node);
		})
		return true;
	}
	return false;
}

// 拖动条的事件处理程序
function rangeListener(){
	objOffset[this.id] = this.value/100;
	reDraw();
}

// 勾选框的事件处理程序
function checkBoxListener(){
	fill = fill == true ? false : true;
	reDraw();
}

// sliceWidth 输入事件
function sliceWidthListener(){
	var _inputText = this.value.trim();
	var _arrSliceWidth = _inputText.split(/\s/);
	if(_arrSliceWidth.length == 0){
		sliceWidth = 27; //不填就是初始值
	}else{
		// 有单位去单位
		var reg = /^\d+%?/;
		sliceWidth = "";
		for(var i = 0, length = _arrSliceWidth.length; i < length; i++){
			var arrReg = _arrSliceWidth[i].match(reg);
			if(arrReg){
				sliceWidth += arrReg[0] + " ";
			}
		}
		if(sliceWidth == ""){
			sliceWidth = 27;
		}else{
			sliceWidth = sliceWidth.trim();
		}
	}

	reDraw();
}

// borderWidth 输入事件
function borderWidthListener(){
	var _inputText = this.value.trim();
	var _arrBorderWidth = _inputText.split(/\s/);
	if(_arrBorderWidth.length == 0){
		borderWidth = "27px";
	}else{
		var reg = /^\d+(%|px|em){0,1}/;
		borderWidth = "";
		for(var i = 0, length = _arrBorderWidth.length; i < length; i++){
			var arrReg = _arrBorderWidth[i].match(reg);
			if(arrReg){
				borderWidth += arrReg[0] + " ";
			}
		}
		if(borderWidth == ""){
			borderWidth = "27px";
		}else{
			borderWidth = borderWidth.trim();
		}
	}

	reDraw();
}

// 垂直方向排列方式
function verRepeatListener(){
	verRepeat = this.value;
	reDraw();
}

// 水平方向排列方式
function horRepeatListener(){
	horRepeat = this.value;
	reDraw();
}