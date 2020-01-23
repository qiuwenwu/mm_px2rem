require('mm_expand');
var Px2rem = require('px2rem');

// 转换的配置参数
var config = {
	// 基本设备像素比率（默认值：2）
	baseDpr: 2,
	 // rem单位值（默认值：16）
	remUnit: 16,
	// rem值精度（默认值：3）如: 0.125rem
	remPrecision: 3,
	//强制px注释（默认值：px）
	forcePxComment: 'px',
	//没有转换值注释（默认：`no`）
	keepComment: 'no'
};

// 实例化一个转换器
var px2remIns = new Px2rem(config);
	
/**
 * 转换函数
 * @param {Object} file
 */
function change(file) {
	// 读取文件
	var css = file.loadText();
	// 转换文本
	var new_css = px2remIns.generateRem(css);
	// 保存文件名
	var f = file.replace('css', 'output');
	// 保存文件
	f.saveText(new_css);
}

function run() {
	// 需要转换的文件目录
	var dir = "./css".fullname(__dirname);
	
	console.log('读取转换css文件目录', dir);
	
	// 文件
	var arr = $.file.get(dir, '*.css');
	console.log(`共需要转换css文件${arr.length}个`);

	console.log(`开始转换`);
	for (var i = 0, o; o = arr[i++];) {
		change(o);
	}
	console.log(`转换完成`);
}

run();