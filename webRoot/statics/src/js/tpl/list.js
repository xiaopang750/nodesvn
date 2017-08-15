/*TMODJS:{"version":82,"md5":"f1ef68f07f839e4a971cb493a2c97924"}*/
define(function(require) {
    return require("./templates")("list", function($data) {
        "use strict";
        var $utils = this, $helpers = $utils.$helpers, $escape = $utils.$escape, data = $data.data, $each = $utils.$each, $string = ($data.$value, 
        $data.$index, $utils.$string), changeName = $helpers.changeName, nowTime = $helpers.nowTime, $out = "";
        return $out += '<li sub-list> <div class="ba-font-14 ba-mb-10" file="', $out += $escape(data.file), 
        $out += '"> <span>', $out += $escape(data.shortFile), $out += '</span> <span class="fa fa-close" list-remove></span> </div> <div class="ba-mb-10"> <span> 请选择历史修改版本: <span class="ba-gray">(最上面的为最新版)</span> </span> <select class="form-control" version> ', 
        $each(data.data, function($value) {
            $out += ' <option value="', $out += $escape($value.version), $out += '"> ', $out += $escape($value.version), 
            $out += " 修改日期:", $out += $escape($value.date), $out += " </option> ";
        }), $out += ' </select> </div> <div class="ba-mb-10"> <span> 请选择历史修改人员名称: <span class="ba-gray">(最上面的为最新版)</span> </span> <select class="form-control" name> ', 
        $each(data.data, function($value) {
            $out += ' <option value="', $out += $string(changeName($value.author)), $out += '">', 
            $out += $string(changeName($value.author)), $out += "</option> ";
        }), $out += ' </select> </div> <div class="ba-mb-10"> <span> bug号: <span class="ba-gray">(可以不填)</span> </span> <input type="text" class="form-control" bug> </div> <div class="ba-mb-10"> <span> 描述: <span class="ba-gray">(可以不填)</span> </span> <input type="text" class="form-control" describe> </div> <div class="ba-mb-10"> <span> 状态: <span class="ba-gray">(可以不填)</span> </span> <input type="text" class="form-control" status> </div> <div class="ba-mb-10"> <span> 日期: </span> <input type="text" class="form-control" time value="', 
        $out += $string(nowTime("")), $out += '" readonly="readonly"> </div> </li> ', new String($out);
    });
});