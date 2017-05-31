var move;
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=LoadingUI,p=c.prototype;
    p.createView = function () {
        //画图的背景颜色 黑色
        var shp = new egret.Shape();
        shp.graphics.beginFill(0xfd3c46, 1);
        shp.graphics.drawRect(0, 0, 750, 1336);
        shp.graphics.endFill();
        this.addChild(shp);
        ///loading图
        var loading = new egret.Bitmap();
        loading.texture = RES.getRes("loading_png");
        loading.fillMode = egret.BitmapFillMode.REPEAT;
        this.addChild(loading);
        if (sessionStorage.getItem("srcData")) {
            $('.btnBon').show();
        }
        else {
            $('.loadbg').fadeOut(200);
        }
        // //loading_bar 进度
        // var loading_bar:egret.Bitmap = new egret.Bitmap();
        // loading_bar.texture = RES.getRes("loading_bar_png");
        // loading_bar.fillMode = egret.BitmapFillMode.REPEAT;
        // loading_bar.x =(750 -118)/2;
        // loading_bar.y =1336 - 300;
        // this.addChild(loading_bar);
        // this.cir = new egret.Shape();
        // this.cir.graphics.lineStyle( 2, 0x00ff00 );
        // this.cir.graphics.endFill();
        // this.addChild( this.cir );
        ///小人的走路
        var data = RES.getRes('loading_man_json');
        var txtr = RES.getRes('loading_man_png');
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        move = new egret.MovieClip(mcFactory.generateMovieClipData('loading_man'));
        this.addChild(move);
        move.gotoAndPlay(0, -1);
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.width = 450;
        this.textField.height = 100;
        this.textField.textAlign = "center";
        this.textField.textColor = 0xf5cd85;
        ///适配
        var clientW = document.documentElement.clientWidth || document.body.clientWidth;
        var clientH = document.documentElement.clientHeight || document.body.clientHeight;
        if (clientW / clientH > 750 / 1120) {
            var scale = 500 / 750;
            loading.x = 125;
            loading.scaleY = scale;
            loading.scaleX = scale;
            move.scaleY = scale;
            move.scaleX = scale;
            // move.x=470;
            move.x = 240;
            move.y = 650;
            this.textField.y = 700;
            this.textField.x = 240;
            this.textField.scaleY = scale;
            this.textField.scaleX = scale;
        }
        else {
            loading.width = 750;
            loading.x = 0;
            move.x = 175;
            //mc1.x=510;
            move.x = 175;
            move.y = 986;
            this.textField.y = 1055;
            this.textField.x = (750 - 450) / 2;
        }
    };
    p.setProgress = function (current, total) {
        // var curPI = current*2*Math.PI/total;
        // this.cir.graphics.drawArc(374,1094,50,0,curPI,false);
        var clientW = document.documentElement.clientWidth || document.body.clientWidth;
        var clientH = document.documentElement.clientHeight || document.body.clientHeight;
        if (clientW / clientH > 750 / 1120) {
            move.x = 240 + current * 230 / total;
        }
        else {
            move.x = 175 + current * 335 / total;
        }
        this.textField.text = 'loading...' + parseInt(current * 100 / total + '') + '%';
    };
    return LoadingUI;
}(egret.Sprite));
egret.registerClass(LoadingUI,'LoadingUI');
//# sourceMappingURL=LoadingUI.js.map