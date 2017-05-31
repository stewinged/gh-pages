
var container;
var oDivH;
var lantern1;
var lantern2;
var lantern3;
var lantern4;
var lantern5;
var lantern6;
var lantern7;
var sign;
var bFlag = 0;
var ballon;

class Main extends egret.DisplayObjectContainer {
    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
         //var jsonDict = {"feedId":""}; //鹿岛详情页的id
        //CcjJSBridgeInstance.callTemplate("SOCIAL_FEED_LIST", JSON.stringify(jsonDict));
         
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceBeiginLoadComplete, this);
        RES.loadGroup("begin");
    }

     /**
     * 配置文件加载完成,开始预加载beigin资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onResourceBeiginLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName == "begin"){
            
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceBeiginLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            //设置加载进度界面
            //Config to load process interface
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);
             RES.loadGroup("preload");
            
            
        }
       
    }



    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceMidComplete, this);
            RES.loadGroup("middle");
            this.createGameScene();
        }
    }
    /**
     * gif组加载完成
     *
     */
    private onResourceMidComplete(event:RES.ResourceEvent):void{
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceMidComplete, this);
            // this.frametween("shoppingbag_json","shoppingbag_png","shoppingbag",250,1450,0,-1);//原地
            // this.frametween("walkman_json","walkman_png","walkman",350,2200,0,-1);
            //  this.mantween("shadowblue_json","shadowblue_png","shadowblue",380,1000,0,-1,380,800,15000);//往返方向运动
            //  this.mantween("shadowblack_json","shadowblack_png","shadowblack",350,1500,0,-1,350,1450,2000);
            //  this.cartween("dogman_json","dogman_png","dogman",250,1150,0,-1,380,1150,3000);//单方向
            // this.mantween("","shadowblue_json","shadowblue_png",380,1000,0,-1,380,800,15000);
            
            //添加第二屏以后的动画
          //this.mantween("blackwomen_json","blackwomen_png","blackwomen",380,1000,0,-1,380,900,5000);
          for(var i=20; i<38; i++){
            let map:string = 'map_'+(i+1) + '_jpg';
            this.createbg(map,i,container)
        }
          //   this.frametween("shoppingbag_json","shoppingbag_png","shoppingbag",250,1450,0,-1,0,0);//原地
          this.mantween("shadowblue_json","shadowblue_png","shadowblue",340,5830,0,-1,340,5800,3000);
          this.mantween("littledog_json","littledog_png","littledog",200,8080,0,-1,0,8080,5000);
          this.frametween("walkman_json","walkman_png","walkman",200,8610,0,-1,0,0);
          this.mantween("blackwomen_json","blackwomen_png","blackwomen",420,8880,0,-1,420,8780,5000);
          this.mantween("shadowblue_json","shadowblue_png","shadowblue",650,9730,0,-1,650,9700,3000);
          //this.mantween("blackwomen_json","blackwomen_png","blackwomen",410,7450,0,-1,440,7350,5000);
         this.mantween("shoppinggirl_json","shoppinggirl_png","shoppinggirl",500,6990,0,-1,650,6990,5000);
          this.mantween("blackwomen_json","blackwomen_png","blackwomen",300,5230,0,-1,370,5130,5000);
          this.frametween("walkman_json","walkman_png","walkman",250,4050,0,-1,0,0);
          this.frametween('lampshort_json','lampshort_png','lampshort',22,5534,0,-1,0,0);//舒适穿搭
          this.frametween('lamplong_json','lamplong_png','lamplong',450,6633,0,-1,0,0);//萌娃过大年
        this.frametween('lampshort_json','lampshort_png','lampshort',22,8207,0,-1,0,0);//团圆宴
        this.frametween('lampshort_json','lampshort_png','lampshort',482,8492,0,-1,0,0);//回家路上
        this.frametween('lampshort_json','lampshort_png','lampshort',22,8727,0,-1,0,0);//迎新年
         if(sessionStorage.getItem("poz")){
            this.$children[0]['scrollTop'] = sessionStorage.getItem("poz");
             $('.loadbg').fadeOut(200);
         }
        
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        //上面自适应展位图
        // var oDiv = document.getElementById('sign');
        // oDiv.style.display = 'block';
        // var clientH = document.documentElement.clientHeight || document.body.clientHeight ;
        // oDivH = this.stage.stageHeight*oDiv.offsetHeight/clientH;

        


        container = new egret.Sprite();//创建显示对象
        container.width = 750;
        // //站位图
        // var shp:egret.Shape = new egret.Shape();
        // shp.graphics.beginFill( 0xcccccc, 1);
        // shp.graphics.drawRect( 0, 0, 750, oDivH);
        // shp.graphics.endFill();
        // container.addChild( shp );
        
        var myscrollView:egret.ScrollView = new egret.ScrollView();//创建滚动窗口
        var draggedObject:egret.Sprite;
        var offsetY:number;
        for(var i=0; i<20; i++){
            let map:string = 'map_'+(i+1) + '_jpg';
            this.createbg(map,i,container)
        }
        //声明说明
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill( 0xd73a4f, 1);
        shp.graphics.drawRect( 0, 0, this.stage.stageWidth, 50);
        shp.graphics.endFill();
        container.addChild( shp );
        //写文字声明的
        var textFieldTop = new egret.TextField();
        container.addChild(textFieldTop);
        textFieldTop.verticalAlign = egret.VerticalAlign.MIDDLE;
        textFieldTop.width = 650;
        textFieldTop.height = 50;
        textFieldTop.x =60;
        textFieldTop.textColor  = 0xffffff;
        textFieldTop.size = 22;
        textFieldTop.text = '鸡年到，咕咕咕，天上掉彩蛋，每天砸大奖';
        //声音的小图标
        var voice:egret.Bitmap = this.createBitmapByName('voice_png');
        container.addChild(voice);
        voice.x = 20;
        voice.y = 13;
        //灯笼
        lantern1 = this.creatLan('12月','28号','red',container,0)
        lantern2 = this.creatLan('12月','29号','yellow',container,1)
        lantern3 = this.creatLan('12月','30号','red',container,2)
        lantern4 = this.creatLan('12月','31号','yellow',container,3)
        // lantern5 = this.creatLan('01月','01号','red',container,4)
        // lantern6 = this.creatLan('01月','02号','yellow',container,5)
        // lantern7 = this.creatLan('01月','03号','red',container,6)
        //点击签到  点亮灯笼
        sign = this.createSign('点击签到领压岁钱','buttonred_png')

        myscrollView.setContent(container);
        myscrollView.width = this.stage.stageWidth;
        myscrollView.height = this.stage.stageHeight;
        myscrollView.verticalScrollPolicy = "on";//水平滚动
        myscrollView.bounces = false;//不开启回弹
        this.addChild(myscrollView);

        // //创建底部的tab

        $('.btnBon').show();
        // let btnTab:egret.Bitmap = this.createBitmapByName('bottom_png');
        // this.addChild(btnTab);
        // var clientH = document.documentElement.clientHeight || document.body.clientHeight ;
        // var clientW = document.documentElement.clientWidth || document.body.clientHeight ;
        // let stageH:number = Math.floor(this.stage.stageWidth*202/750);
        
        // btnTab.width = this.stage.stageWidth;
        // btnTab.height = stageH;
        // btnTab.x =0;
        // btnTab.y = this.stage.stageHeight - stageH;


        //下雪
        // this.dropSnow();

        //背景音乐
        //  var sound:egret.Sound = new egret.Sound();
        // sound.addEventListener(egret.Event.COMPLETE, function loadOver(event:egret.Event) {
        //     sound.play();
        // }, this);
        // sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event:egret.IOErrorEvent) {
        //     console.log("loaded error!");
        // }, this);
        // sound.load("resource/sound/back.mp3");

        //添加事件
       
        //设置显示对象可以相应触摸事件
        container.touchEnabled = true;
        //注册事件点击
        container.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouch, this );

        ///加首先加载的动画 狮子还有小人彩灯
        //氢气球
        // var ballon:egret.Bitmap = this.createBitmapByName('balloon_png');
        // container.addChild(ballon);
        // ballon.x =0;
        // ballon.y = 2100;
        // var ballontw = egret.Tween.get( ballon ,{loop:true});
        // ballontw.to( {y:2050}, 2000).to({y:2100},2000);
        ballon =  this.createballon('萌娃过大年会场','全场满99元减10元');
        //  this.mantween("littledog_json","littledog_png","littledog",380,1000,0,-1,280,1000,5000);
         this.mantween("shoppinggirl_json","shoppinggirl_png","shoppinggirl",260,1348,0,-1,400,1348,5000);
         this.mantween("blackwomen_json","blackwomen_png","blackwomen",350,2830,0,-1,350,2730,5000);
        //  this.mantween("shadowblue_json","shadowblue_png","shadowblue",350,3800,0,-1,350,3550,10000);
         ///this.frametween('headflash_json','headflash_png','headflash',14,330,0,-1,0,0);
        
         //this.createaloneBItmap('lanternright_png',485,730,0,0,true,0,0,2);
         //this.createaloneBItmap('lanternleft_png',8,730,0,0,true,0,0,2);
         this.frametween('lion_json','lion_png','lion',420,680,0,-1,0.8,0.8);
         this.createaloneBItmap('newcoule_png',490,1030,0,0,false,0,0,0)
         this.frametween('lampshort_json','lampshort_png','lampshort',22,979,0,-1,0,0);//尝年味儿
         this.frametween('lampshort_json','lampshort_png','lampshort',490,1096,0,-1,0,0);//焕新衣
         this.frametween('lamphalf_json','lamphalf_png','lamphalf',22,2464,0,-1,0,0);//娱乐城
         this.frametween('lampshort_json','lampshort_png','lampshort',483,4181,0,-1,0,0);//丽人馆
         this.mantween("shadowblue_json","shadowblue_png","shadowblue",380,3280,0,-1,420,3250,3000);
         


    }

    private onTouch( evt:egret.TouchEvent )
    {
        var tabH = this.stage.stageHeight - Math.floor(this.stage.stageWidth*202/750);
        var scrollTop = this.$children[0]['scrollTop'];
        var tap_x = evt.stageX;
        var tap_y = evt.stageY + scrollTop;
        sessionStorage.setItem("poz", scrollTop);
        if(evt.stageY > tabH){
            console.log('底部')
            return;
        }
        if(tap_x>256 && tap_x<332 && tap_y>499 && tap_y<543){
            console.log('森女部落');
        }
        console.log('x'+tap_x+':y'+tap_y)
        var oDiv = document.getElementById('canva').children[0];
        var src = oDiv.toDataURL('image/jpeg',0.1);
        sessionStorage.setItem("srcData", src);
        if( tap_x>506 && tap_x<713 && tap_y>79 && tap_y<157){
            if(bFlag == 0){
                container.removeChild(lantern1);
                container.removeChild(sign);
                lantern1 = this.creatLan('12月','28号','yellow',container,0);
                sign = this.createSign('已领取，逛逛大街','buttongeny_png')
                bFlag = 1;
                $('.sign-in').show();
            }
        }
            
    }
    
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        let result = new egret.Bitmap();
        let texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     *创建独立的位图 
     *x，y:定位
     * scaleX,scaleY,是否缩放[0-不缩放]
     *  tween:true-开启动画
     * endX：目标X值[0---x轴不动]
     * endY:目标Y值[0----Y轴不动]
     * rotation:旋转角度[0---不旋转]
     *
     */
    private createaloneBItmap(name:string,x:number,y:number,scaleX:number,scaleY:number,tween:boolean,endX:number,endY:number,rotation:number){
            let bomImg:egret.Bitmap = this.createBitmapByName(name);
            bomImg.x=x;
            bomImg.y=y;
            scaleX?bomImg.scaleX=scaleX:'';
            scaleY?bomImg.scaleY=scaleY:'';
            if(tween){
            var tw = egret.Tween.get( bomImg ,{loop:true});
            rotation?bomImg.rotation=rotation:'';
            var data1={},data2={};
            endX?data1['x']=endX:'';
            endY?data1['y']=endY:'';
            rotation?data1['rotation']=-rotation:'';
            endX?data2['x']=-endX:'';
            endY?data2['y']=-endY:'';
            rotation?data2['rotation']=rotation:'';
            tw.to(data1, 500 ).to(data2,500);
            }
            container.addChild(bomImg);
    }
    /**
     * 根据name和num 创建背景平铺。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createbg(name:string,num:number,container):void{
            let bomImg:egret.Bitmap = this.createBitmapByName(name);
            container.addChild(bomImg);
            let stageW:number = Math.floor(this.stage.stageWidth/2);
            let stageH:number = Math.floor(this.stage.stageWidth/2*544/375);
            var clientW = document.documentElement.clientWidth || document.body.clientWidth ;
            bomImg.width = stageW;
            bomImg.height = stageH;
            bomImg.x = num % 2 * stageW;
            bomImg.y = Math.floor(num / 2) * stageH + 50;
        // if(num < 10){
        //     //第一屏 
        //     let bomImg:egret.Bitmap = this.createBitmapByName(name);
        //     container.addChild(bomImg);
        //     let stageW:number = Math.floor(this.stage.stageWidth/2);
        //     let stageH:number = Math.floor(this.stage.stageWidth/2*500/375);
        //     var clientW = document.documentElement.clientWidth || document.body.clientWidth ;
        //     bomImg.width = stageW;
        //     bomImg.height = stageH;
        //     bomImg.x = num % 2 * stageW;
        //     bomImg.y = Math.floor(num / 2) * stageH + 50;
        // }else{
        //     //以后的
        //     RES.getResAsync(name,compFunc,num);
        //     var that = this
        //     function compFunc(){
        //        console.log(num);
        //         let bomImg:egret.Bitmap = that.createBitmapByName(name);
        //         container.addChild(bomImg);
        //         let stageW:number = Math.floor(that.stage.stageWidth/2);
        //         let stageH:number = Math.floor(that.stage.stageWidth/2*500/375);
        //         var clientW = document.documentElement.clientWidth || document.body.clientWidth ;
        //         bomImg.width = stageW;
        //         bomImg.height = stageH;
        //         bomImg.x = num % 2 * stageW;
        //         bomImg.y = Math.floor(num / 2) * stageH + 50;
        //     }
        // }
        
    }
    
    private createLantern(month:string,day:string,color:string){
        var lancon = new egret.Sprite();
        let lant = this.createBitmapByName(color);
        lancon.addChild(lant);
        //月份
        var textField = new egret.TextField();
        lancon.addChild(textField);
        
        textField.y =45;
        textField.width = 60;
        textField.height = 30;
        textField.textAlign = "center";
        
        
        textField.text = month;
        textField.size = 14;
        textField.bold = true;
        //日子
        var textFieldDay = new egret.TextField();
        lancon.addChild(textFieldDay);
        
        textFieldDay.y =60;
        textFieldDay.width = 60;
        textFieldDay.height = 30;
        textFieldDay.textAlign = "center";
        textFieldDay.textColor  = 0xa03d37;
        textFieldDay.text = day;
        textFieldDay.size = 18;
        textFieldDay.bold = true;
        if(color == 'red'){
            textFieldDay.textColor  = 0xa03d37;
            textField.textColor  = 0xa03d37;
            textField.x =15;
            textFieldDay.x =15;
        }else{
            textFieldDay.textColor  = 0xfbeab6;
            textField.textColor  = 0xfbeab6;
            textField.x =13;
            textFieldDay.x =13;
        }
        return lancon;

    }
    //创建灯笼
    private creatLan(month:string,day:string,color:string,container,num:number){
        var lantern = this.createLantern(month,day,color);
        container.addChild(lantern);
        lantern.y = 50;
        lantern.x = 80 + num*115;
        lantern.anchorOffsetX = lantern.width/2;
        var tw = egret.Tween.get( lantern ,{loop:true});
        lantern.rotation=6;
        tw.to( {rotation:-6}, 500 ).to({rotation:6},500);
        // if(color == 'yellow'){
        //     lantern.x = 60 + num*105;
        //     lantern.anchorOffsetX = lantern.width/2;
        //     var tw = egret.Tween.get( lantern ,{loop:true});
        //     lantern.rotation=8;
        //     tw.to( {rotation:-8}, 500 ).to({rotation:8},500);
        // }else{
        //     lantern.x = 20 + num*105;
        // }
        return lantern;
     
    }


    ////创建签到的按钮
    private createSign(text:string,name:string){
        var box = new egret.Sprite();
        container.addChild(box);
        box.x=505;
        box.y=80;
        let signImg = this.createBitmapByName(name);
        box.addChild(signImg);
        //文案
        // var textField = new egret.TextField();
        // box.addChild(textField);
        
        // textField.y =0;
        // textField.x =0;
        // textField.width = 400;
        // textField.height = 63;
        // textField.textAlign = "center";
        // textField.textColor  = 0xfaddb7;
        // textField.verticalAlign = egret.VerticalAlign.MIDDLE;
        // textField.text = text;
        // textField.size = 34;
        // textField.bold = true;
        return box;

    }

     ////创建气球运动
    private createballon(textHead:string,textBot:string){
        var ballon = new egret.Sprite();
        container.addChild(ballon);
        ballon.x=0;
        ballon.y=2030;
        //氢气球
        var ballonImg:egret.Bitmap = this.createBitmapByName('balloon_png');
        ballon.addChild(ballonImg);
        var ballontw = egret.Tween.get( ballon ,{loop:true});
        ballontw.to( {y:1970}, 2000).to({y:2030},2000);
        //文案头部
        var textField = new egret.TextField();
        ballon.addChild(textField);
        textField.y =350;
        textField.x =81;
        textField.width = 190;
        textField.height = 30;
        textField.textAlign = "center";
        textField.textColor  = 0xed3f2f;
        textField.verticalAlign = egret.VerticalAlign.MIDDLE;
        textField.text = textHead;
        textField.size = 24;
        textField.bold = true;
        //文案下部
        var textFieldbtn = new egret.TextField();
        ballon.addChild(textFieldbtn);
        textFieldbtn.y =380;
        textFieldbtn.x =91;
        textFieldbtn.width = 170;
        textFieldbtn.height = 20;
        textFieldbtn.textAlign = "center";
        textFieldbtn.textColor  = 0x1274b5;
        textFieldbtn.verticalAlign = egret.VerticalAlign.MIDDLE;
        textFieldbtn.text = textBot;
        textFieldbtn.size = 18;
        textFieldbtn.bold = true;
        return ballon;

    }
    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }

    /**
     * 帧动画（原地的）
     * x,y当前动画相对于container的x，y坐标
     * frame:动画开启的帧数
     * rescord:是否开启循环[>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数]
     * scaleX,scaleY,[0-不缩放]；
     */
    private frametween(jsonname:string,imgname:string,name:string,x:number,y:number,frame:number,rescord:number,scaleX:number,scaleY:number):void {
        var data = RES.getRes(jsonname);
        var txtr = RES.getRes(imgname);
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        var mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( name ) );
        mc1.x=x;
        mc1.y=y;
        scaleX?mc1.scaleX=scaleX:'';
        scaleY?mc1.scaleY=scaleY:'';
        container.addChild( mc1 );
        mc1.gotoAndPlay(frame,rescord); 
    }

    // private dropSnow():void{
    //             //获取纹理
    //     var texture = RES.getRes("magic_png");
    //     //获取配置
    //     var config = RES.getRes("snow_json");
    //     //创建 GravityParticleSystem
    //     this.snow = new particle.GravityParticleSystem(texture, config);
    //     //启动粒子库
    //     this.snow.start();
    //     //将例子系统添加到舞台
    //     this.addChild(this.snow);
    // }
    
    /**
     * 小人帧动画+移动（往返两个方向）
     * jsonname:json数据名称
     * imgname:img名称
     * name:json数据里的那个key
     * x,y当前动画相对于container的x，y坐标（起始位置）
     * frame:动画开启的帧数
     * rescord:是否开启循环[>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数]
     * endX：x轴目标位置
     * endY:y轴目标位置
     * interval:移动到目标位置需要的时间
     */
    private mantween(jsonname:string,imgname:string,name:string,x:number,y:number,frame:number,rescord:number,endX:number,endY:Number,interval:number):void{
             var data = RES.getRes(jsonname);
             var txtr = RES.getRes(imgname);
             var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
             var mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( name ) );
                mc1.x=x;
                mc1.y=y;
             var tw = egret.Tween.get( mc1 ,{loop:true});
             tw.to( {x:endX,y:endY}, interval ).to({x:x,y:y},interval);
             container.addChild( mc1 );
             mc1.gotoAndPlay(frame,rescord);    
    }
    /**
     * 汽车帧动画+移动（同一方向）
     * jsonname:json数据名称
     * imgname:img名称
     * name:json数据里的那个key
     * x,y当前动画相对于container的x，y坐标（起始位置）
     * frame:动画开启的帧数
     * rescord:是否开启循环[>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数]
     * endX：x轴目标位置
     * endY:y轴目标位置
     * interval:移动到目标位置需要的时间
     */
       private cartween(jsonname:string,imgname:string,name:string,x:number,y:number,frame:number,rescord:number,endX:number,endY:Number,interval:number):void{
             var data = RES.getRes(jsonname);
             var txtr = RES.getRes(imgname);
             var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
             var mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( name ) );
                mc1.x=x;
                mc1.y=y;
             var tw = egret.Tween.get( mc1 ,{loop:true});
             tw.to( {x:endX,y:endY}, interval )
             container.addChild( mc1 );
             mc1.gotoAndPlay(frame,rescord);    
    }

}


