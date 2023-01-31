$(function () {
  //为左侧导航列表添加背景图片
  addBackGround();
  //初始化轮播板块
  iniInfoList();
  //开关城市列表
  toggleCityList();
  //设定左侧导航列表样式
  leftListStyle();
  //切换右侧滚动列表
  switchList();
  //显示按钮组1
  showButton1();
  //按钮组1的click事件
  clickButton1();
  //三个小圆点的hover事件
  indexBoxActive();
  //按钮组2的click事件
  clickButton2();
  //显示“偷懒”
  showLazy();
  //隐藏或显示"backTop"
  showBackTop();
  //暂停轮播动画播放
  playerPause();
  //三个定时器，用于播放轮播动画
  var player1 = setInterval(play1, 5000);
  var player2 = setInterval(play2, 100);
  var player3 = setInterval(function () {
    startPlayer3(0);
  }, 5000);

  //操作下方的轮播板块 参数PreviousOrNext 指定显示上一张或下一张
  function startPlayer3(pOrN) {
    //获取当前左外边距
    var currentMargin = parseInt($(".contentList").css("margin-left"));
    //参数为0，播放下一张，否则播放上一张
    if (pOrN == 0) {
      play3(currentMargin);
    } else {
      play3Back(currentMargin);
    }
  }

  function addBackGround() {
    for (var index = 0; index < 10; index++) {
      var $thisDD = $(".classification>dd:eq(" + index + ")");
      $thisDD.css(
        "background",
        "url('img/ListIcon/icon" + (index + 1) + ".png') 10px center no-repeat"
      );
      $thisDD.hover(
        function () {
          var num = $(this).index();
          $(this).css(
            "background-image",
            "url('img/ListIcon/RedIcon/" + num + ".png')"
          );
        },
        function () {
          var num = $(this).index();
          $(this).css(
            "background-image",
            "url('img/ListIcon/icon" + num + ".png')"
          );
        }
      );
    }
  }

  function toggleCityList() {
    $(".changeCity").hover(function () {
      $(".cityList").toggle();
    });
  }

  function leftListStyle() {
    //保存元素原本的字体颜色，用于onmouseleave时恢复
    var originalColor;
    //最后一个dd 默认添加下边框
    $(".classification>dd:last").css({ "border-bottom": "#dcdcdc 1px solid" });
    $(".classification>dd").hover(
      function () {
        //所有dd的右边框变为红色
        $(".classification>dd").css("border-right", "solid 2px #ec232f");
        //背景色渐变效果
        $(this).css({
          "background-color": "#f6cdd0",
          transition: "background-color 1s",
          border: "2px solid #ec232f",
          "border-right": "none",
        });
        //保存原样式
        originalColor = $(this).children("a").css("color");
        $(this).children("a").css("color", "#ec232f");
        //显示隐藏的详情菜单
        $(this).children(".details").css("display", "block");
        $(this)
          .children(".bgIMG")
          .css("background-image", "url(img/ListIcon/RedIcon/em_red.gif)");
      },
      function () {
        //恢复背景和边框
        $(this).css({
          "background-color": "transparent",
          border: "none",
          transition: "background-color 1s",
        });
        $(".classification>dd").css({
          "border-right": "#dcdcdc 1px solid",
          "border-left": "#dcdcdc 1px solid",
        });
        $(".classification>dd:last").css({
          "border-bottom": "#dcdcdc 1px solid",
        });
        //恢复字体颜色
        $(this).children("a").css("color", originalColor);
        //隐藏详情菜单
        $(this).children(".details").css("display", "none");
        $(this)
          .children(".bgIMG")
          .css("background-image", "url(img/ListIcon/em.png)");
      }
    );
  }

  function showButton1() {
    $(".infoBox").hover(function () {
      $(".button1").toggle();
    });
  }

  function clickButton1() {
    $(".b1Next").click(function () {
      //暂停动画计时器
      clearInterval(player1);
      // var $set = $(".infoList>li");
      // //遍历轮播板块 确认当前显示的是第几个li
      // for (var index in $set) {
      //     var isBlock = $($set).eq(index).css("display") == "block";
      //     //得到下一张要显示的li的下标
      //     if (isBlock) {
      //         if (index != 2) {
      //             index++;
      //         } else {
      //             index = 0;
      //         }
      //         //开始切换动画
      //         changePlay1(index);
      //         break;
      //     }
      // }
      play1();
      //重置计时器
      player1 = setInterval(play1, 5000);
    });
    $(".b1Previous").click(function () {
      clearInterval(player1);
      var $set = $(".infoList>li");
      for (var index in $set) {
        var isBlock = $($set).eq(index).css("display") == "block";
        if (isBlock) {
          if (index != 0) {
            index--;
          } else {
            index = 2;
          }
          changePlay1(index);
          break;
        }
      }
      player1 = setInterval(play1, 5000);
    });
  }

  function indexBoxActive() {
    $(".indexBox>li").hover(
      function () {
        clearInterval(player1);
        var index = $(this).index();
        changePlay1(index);
      },
      function () {
        player1 = setInterval(play1, 5000);
      }
    );
  }

  function switchList() {
    //默认选择第一个列表
    selectTitle(0);
    $(".titleList>li").mouseover(function () {
      var id = $(this).index();
      selectTitle(id);
    });
  }

  function selectTitle(id) {
    //非选择的列表 去除样式
    $(".titleList>li:not(:eq(" + id + "))").removeClass("redTitle");
    $(".titleList>li:eq(" + id + ")").addClass("redTitle");
    switch (id) {
      case 0:
        createList0();
        style1();
        break;
      case 1:
        createList1();
        style1();
        break;
      case 2:
        createList2();
        style2();
        $(".scrollList > li > a").css("width", "100%");
        break;
      case 3:
        createList3();
        style2();
        break;
    }
    //重置滚动列表的位置
    $(".scrollList").css("top", 0);
  }

  function createList0() {
    var list1Content =
      "2019年闽南理工学院全日制自考本科招生简章\n" +
      "2019年广州工商学院公开学院专本连读特色班\n" +
      "2019年福州大学至诚学院全日制自考专本连读招\n" +
      "2019年阳光学院全日制自考本科招生简章\n" +
      "2019年继续教育学院专本连读招生简章\n" +
      "2019年广州番禺职业技术学院成人高考招生简章\n" +
      "2019年福建生态工程学校（应用型大专特色班）招生\n" +
      "2019年华侨大学全日制自考本科秋季招生简章\n" +
      "2019年大连理工大学春季网络教育招生简章\n" +
      "福州日语培训——日式文化体验\n" +
      "天津幼儿园园长资格证取证班\n" +
      "2019年国家开放大学（中央电大）招生简章\n" +
      "2019年电子科技大学网络教育招生简章\n" +
      "2019年东北财经大学网络教育招生简章\n" +
      "2019年集美大学全日制自考（专本连读）招生简章\n" +
      "2019年厦门市同安职业技术学校应用大专班招生\n" +
      "2019年三明医学科技职业学院成人高考招生简章\n" +
      "2019年北京外国语大学网络教育招生简章\n" +
      "2019年天津建委技工证培训班\n" +
      "天津软华国际教育物业经理人培训班\n" +
      "2019年北京邮电大学网络教育招生简章\n" +
      "2019年天津大学网络教育招生简章";
    var list1Arr = list1Content.split("\n");
    var arr = $(".scrollList");
    //清空当前列表内容
    $(arr).html("");
    //加入内容
    for (var i in list1Arr) {
      $(arr).append(
        $(
          "<li><a>" +
            list1Arr[i] +
            "</a><div style='color: #ec232f'>电询</div></li>"
        )
      );
    }
    $(
      ".scrollList>li:nth-of-type(3)>div,.scrollList>li:nth-of-type(25)>div"
    ).text("￥15000");
    $(
      ".scrollList>li:nth-of-type(4)>div,.scrollList>li:nth-of-type(26)>div"
    ).text("￥13800");
    $(
      ".scrollList>li:nth-of-type(9)>div,.scrollList>li:nth-of-type(31)>div"
    ).text("￥10000");
    $(
      ".scrollList>li:nth-of-type(15)>div,.scrollList>li:nth-of-type(37)>div"
    ).text("￥21000");
    $(
      ".scrollList>li:nth-of-type(20)>div,.scrollList>li:nth-of-type(42)>div"
    ).text("￥13500");
  }

  function createList1() {
    var list1Content =
      "成人高考靠谱吗 关于成人高考都有哪些学习方式\n" +
      "2019福建泉州成人高考招生院校公布 福建自考法律专业课程有哪些\n" +
      "大小自考如何区分差别在哪 揭秘自考机构诈骗陷阱令人发指\n" +
      "学历低会对我们造成哪些影响 我们可以通过哪种方式提升学历\n" +
      "网络教育特色优势表现在哪 适合福建上班族的成考院校有哪些\n" +
      "福建福州成考函授去哪里报名 专升本函授自考三者区别大揭秘\n" +
      "成考最快毕业捷径真的有吗 成人高考报名专业怎么选?\n" +
      "如何报考自考科目才能保证最短时间毕业 这四个方法必须收藏\n" +
      "2019自考本科学历要多少钱 本科选择民办还是自考区别在哪\n" +
      "成人高考靠谱吗 关于成人高考都有哪些学习方式\n" +
      "2019福建泉州成人高考招生院校公布 福建自考法律专业课程有哪些\n" +
      "大小自考如何区分差别在哪 揭秘自考机构诈骗陷阱令人发指\n" +
      "学历低会对我们造成哪些影响 我们可以通过哪种方式提升学历\n" +
      "网络教育特色优势表现在哪 适合福建上班族的成考院校有哪些\n" +
      "福建福州成考函授去哪里报名 专升本函授自考三者区别大揭秘\n" +
      "成考最快毕业捷径真的有吗 成人高考报名专业怎么选?\n" +
      "如何报考自考科目才能保证最短时间毕业 这四个方法必须收藏\n" +
      "2019自考本科学历要多少钱 本科选择民办还是自考区别在哪";
    var list1Arr = list1Content.split("\n");
    var arr = $(".scrollList");
    $(arr).html("");
    var date = 10;
    for (var i in list1Arr) {
      if (i % 3 == 0 && i != 0) {
        date++;
      }
      if (i == 9) {
        date = 10;
      }
      $(arr).append(
        $("<li><a>" + list1Arr[i] + "</a><div>[07-" + date + "]</div></li>")
      );
    }
  }

  function createList2() {
    var list1Content =
      "520 · 学你所爱\n" +
      "4月18日-5月18日“ 勤学季”，学在春天！\n" +
      "魅力女神节现金红包，推荐即得\n" +
      "女神大礼包，活出精彩自己\n" +
      "扫码抢！0元升学名额\n" +
      "购课狂欢节，单人最高可减¥800\n" +
      "猎学网感恩季，享全年最低价\n" +
      "暑期图书馆念书最佳伴侣，无门槛免费送！\n" +
      "猎学网发红包啦\n" +
      "520 · 学你所爱\n" +
      "4月18日-5月18日“ 勤学季”，学在春天！\n" +
      "魅力女神节现金红包，推荐即得\n" +
      "女神大礼包，活出精彩自己\n" +
      "扫码抢！0元升学名额\n" +
      "购课狂欢节，单人最高可减¥800\n" +
      "猎学网感恩季，享全年最低价\n" +
      "暑期图书馆念书最佳伴侣，无门槛免费送！\n" +
      "猎学网发红包啦";
    var list1Arr = list1Content.split("\n");
    var arr = $(".scrollList");
    $(arr).html("");
    for (var i in list1Arr) {
      $(arr).append($("<li><a>" + list1Arr[i] + "</a></li>"));
    }
  }

  function createList3() {
    var list1Content =
      "康语儿童智能康复中心 \n" +
      "聚创聚英考研 \n" +
      "知源商学院(珠海)有限公司 \n" +
      "维欧国际教育科技（北京）有限公司 \n" +
      "中智元新企业管理有限公司 \n" +
      "崇川区百度教育咨询中心 \n" +
      "广东开放大学 \n" +
      "广州番禺职业技术学院继续教育学院 \n" +
      "三明医学科技职业学院继续教育学院 \n" +
      "引航餐饮技术培训中心 \n" +
      "CFBC调酒培训 \n" +
      "昆明市西山区开创职业培训学校 \n" +
      "鸿儒树森国际英语 \n" +
      "成都恒益实用技术职业培训学校 \n" +
      "青芒果生物科技有限公司 \n" +
      "湖南君成教育咨询有限公司 \n" +
      "康语儿童智能康复中心 \n" +
      "聚创聚英考研 \n" +
      "知源商学院(珠海)有限公司 \n" +
      "维欧国际教育科技（北京）有限公司 \n" +
      "中智元新企业管理有限公司 \n" +
      "崇川区百度教育咨询中心 \n" +
      "广东开放大学 \n" +
      "广州番禺职业技术学院继续教育学院 \n" +
      "三明医学科技职业学院继续教育学院 \n" +
      "引航餐饮技术培训中心 \n" +
      "CFBC调酒培训 \n" +
      "昆明市西山区开创职业培训学校 \n" +
      "鸿儒树森国际英语 \n" +
      "成都恒益实用技术职业培训学校 \n" +
      "青芒果生物科技有限公司 \n" +
      "湖南君成教育咨询有限公司 ";
    var list1Arr = list1Content.split("\n");
    var arr = $(".scrollList");
    $(arr).html("");
    var date = 10;
    for (var i in list1Arr) {
      if (i % 4 == 0 && i != 0) {
        date++;
      }
      if (i == 9) {
        date = 10;
      }
      $(arr).append(
        $("<li><a>" + list1Arr[i] + "</a><div>[07-" + date + "]</div></li>")
      );
    }
  }

  function style1() {
    var arr = $(".scrollList");
    $(arr).children("li").css({
      "background-image": "url('img/ListIcon/em.png')",
      "background-position": "5px",
      "background-repeat": "no-repeat",
    });
    $(arr).children("li").children("a").css("margin-left", "10px");
    $(".scrollList > li > a").css("width", "230px");
  }

  function style2() {
    var arr = $(".scrollList");
    $(arr).children("li").css("background-image", "none");
    $(arr).children("li>a").css({ "margin-left": "0", width: "230px" });
  }

  function iniInfoList() {
    //默认显示第一个li
    $(".infoList>li:not(:eq(0))").hide();
  }

  function play1() {
    var $set = $(".infoList>li");
    //遍历轮播板块 确认当前显示的是第几个li
    for (var index in $set) {
      var isBlock = $($set).eq(index).css("display") == "block";
      //得到下一张要显示的li的下标
      if (isBlock) {
        if (index != 2) {
          index++;
        } else {
          index = 0;
        }
        //开始切换动画
        changePlay1(index);
        break;
      }
    }
  }

  function changePlay1(index) {
    $(".infoList>li").eq(index).stop().fadeIn().siblings().fadeOut();
    $(".indexBox>li")
      .eq(index)
      .stop()
      .css("background", "white")
      .siblings()
      .stop()
      .css("background", "none");
  }

  function play2() {
    var n = $(".scrollBox").scrollTop();
    n++;
    // 到达切换点时, 改变列表并重头开始
    if (n >= 30) {
      n = 0;
      $(".scrollList").append($(".scrollList>li:first"));
    }
    $(".scrollBox").scrollTop(n);
  }

  function play3(currentMargin) {
    if (currentMargin == 0) {
      clearInterval(player3);
      var changePlay3 = setInterval(function () {
        if (currentMargin <= -304) {
          $(".contentList").css("margin-left", "0");
          $(".contentList").append($(".contentList>li:first"));
          player3 = setInterval(function () {
            startPlayer3(0);
          }, 5000);
          clearInterval(changePlay3);
        } else {
          currentMargin -= 10;
          $(".contentList").css("margin-left", currentMargin + "px");
        }
      }, 10);
    }
  }

  function play3Back(currentMargin) {
    if (currentMargin == 0) {
      clearInterval(player3);
      currentMargin = -304;
      $(".contentList").prepend($(".contentList>li:last"));
      $(".contentList").css("margin-left", currentMargin + "px");
      var changePlay3Back = setInterval(function () {
        if (currentMargin >= 0) {
          $(".contentList").css("margin-left", "0");
          player3 = setInterval(function () {
            startPlayer3(0);
          }, 5000);
          clearInterval(changePlay3Back);
        } else {
          currentMargin += 10;
          $(".contentList").css("margin-left", currentMargin + "px");
        }
      }, 10);
    }
  }

  function playerPause() {
    $(".infoList>li").hover(
      function () {
        clearInterval(player1);
      },
      function () {
        player1 = setInterval(play1, 5000);
      }
    );
    $(".scrollList").hover(
      function () {
        clearInterval(player2);
      },
      function () {
        player2 = setInterval(play2, 100);
      }
    );
  }

  function clickButton2() {
    $(".b2Previous").click(function () {
      startPlayer3(1);
    });
    $(".b2Next").click(function () {
      startPlayer3(0);
    });
  }

  function showLazy() {
    $(".fixedBoxLeft>li:gt(0)").bind("click", function () {
      alert("偷懒没做: P");
    });
  }

  function showBackTop() {
    var $ele = $(".backTop");
    $(document).scroll(function () {
      var n = $(this).scrollTop();
      if (n >= 200) {
        $ele.stop().fadeIn();
      } else {
        $ele.stop().fadeOut();
      }
    });
  }
});
