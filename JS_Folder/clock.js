var clockSet = false;

var ac = {
    // (A) INITIALIZE ALARM CLOCK
    init : function () {
      // (A1) GET THE CURRENT TIME - HOUR, MIN, SECONDS
      ac.chr = document.getElementById("chr");
      ac.cmin = document.getElementById("cmin");
      ac.csec = document.getElementById("csec");
  
      // (A2) CREATE TIME PICKER - HR, MIN, SEC
      ac.thr = ac.createSel(23);
      document.getElementById("tpick-h").appendChild(ac.thr);
      ac.thm = ac.createSel(59);
      document.getElementById("tpick-m").appendChild(ac.thm);
      ac.ths = ac.createSel(59);
      document.getElementById("tpick-s").appendChild(ac.ths);
      // ac.thd = ac.createSel(14);
      // document.getElementById("tpick-d").appendChild(ac.thd);
  
      // (A3) CREATE TIME PICKER - SET, RESET
      ac.tset = document.getElementById("tset");
      ac.tset.addEventListener("click", ac.set);
      // ac.treset = document.getElementById("treset");
      // ac.treset.addEventListener("click", ac.reset);
  
      // (A4) GET ALARM SOUND
      ac.sound = document.getElementById("alarm-sound");
  
      // (A5) START THE CLOCK
      ac.alarm = null;
      setInterval(ac.tick, 1000);
    },
  
    // (B) SUPPORT FUNCTION - CREATE SELECTOR FOR HR, MIN, SEC
    createSel : function (max) {
      var selector = document.createElement("select");
      for (var i=0; i<=max; i++) {
        var opt = document.createElement("option");
        i = ac.padzero(i);
        opt.value = i;
        opt.innerHTML = i;
        selector.appendChild(opt);
      }
      return selector
    },
  
    // (C) SUPPORT FUNCTION - PREPEND HR, MIN, SEC WITH 0 (IF < 10)
    padzero : function (num) {
      if (num < 10) { num = "0" + num; }
      else { num = num.toString(); }
      return num;
    },
  
    // (D) UPDATE CURRENT TIME
    tick : function () {
      // (D1) CURRENT TIME
      var now = new Date();
      var hr = ac.padzero(now.getHours());
      var min = ac.padzero(now.getMinutes());
      var sec = ac.padzero(now.getSeconds());
  
      // (D2) UPDATE HTML CLOCK
      ac.chr.innerHTML = hr;
      ac.cmin.innerHTML = min;
      ac.csec.innerHTML = sec;
      getAccountBalance();

      checkInUse(); 
      var date_object = new Date();
      var c_hr = parseInt(date_object.getHours());
      var c_min = parseInt(date_object.getMinutes());

      if(parseInt(ac.thr.value)*3600+parseInt(ac.thm.value)*60>c_hr*3600+c_min*60){
        $(".includingToday").show();
      }else{
        $(".includingToday").hide();
      }
    },
  
    // (E) SET ALARM
    set : function () {
      if (getFutureDateTimeInSecs()-getCurrentDateTimeInSecs()>0){

        if (parseFloat($(".deposit").val())>0){
          var ready = confirm("You cannot makes changes until "
          +getFutureDateTime()[3]+ ":"
          +getFutureDateTime()[4]+ ":"
          +getFutureDateTime()[5] + " on "
           +getFutureDateTime()[0]+ "-"
           +getFutureDateTime()[1]+ "-"
           +getFutureDateTime()[2]+ ". "
          +"Are you sure you want to proceed?");

          if (ready==true){
            ac.alarm = ac.thr.value + ac.thm.value + ac.ths.value;
            // ac.thr.disabled = true;
            // ac.thm.disabled = true;
            // ac.ths.disabled = true;
            // ac.tset.disabled = true;
            // $(".date").prop('disabled',true);
            // $(".deposit").prop('disabled',true);
            // disable_clock(); 
  
            var c_time = getCurrentDateTime();
            var f_time = getFutureDateTime();
            

            setAlarm(c_time[0],c_time[1],c_time[2],c_time[3],c_time[4],c_time[5],f_time[0],f_time[1],f_time[2],f_time[3],f_time[4],f_time[5],$("#include").prop("checked")); 
            clockSet = true; 
            
            //task startTaskTimer(); 
            getTaskTime(); 
            getClockTime();

            //create some fakes user to demo redistribution
            // creatFakeUser();
            // hide_clock_show_pow();
          } 
        }else{
          alert("Deposit cannot be zero!");
        }
      }else{
        alert("Cannot set a time in the past!");
      }

    },
  
    // (F) RESET ALARM
    // reset : function () {
    //   ac.thr.disabled = false;
    //   ac.thm.disabled = false;
    //   ac.ths.disabled = false;
    //   ac.tset.disabled = false;
    //   $(".date").prop('disabled',false);
    //   $(".deposit").prop('disabled',false);

    // }
  };

  function enable_clock(){
    // console.log("clock enabled")
    ac.thr.disabled = false;
    ac.thm.disabled = false;
    ac.ths.disabled = false;
    ac.tset.disabled = false;
    $(".date").prop('disabled',false);
    $(".deposit").prop('disabled',false);

  }

  function disable_clock(){
    // console.log("clock disabled")
    ac.thr.disabled = true;
    ac.thm.disabled = true;
    ac.ths.disabled = true;
    ac.tset.disabled = true;
    $(".date").prop('disabled',true);
    $(".deposit").prop('disabled',true);

  }
  function calDuration(){
    var f_date = $(".date").val().split("-");
    var f_year = parseInt(f_date[0]);
    var f_month = parseInt(f_date[1]);
    var f_date = parseInt(f_date[2]);

    var date_object = new Date(); 
    var c_year = parseInt(date_object.getFullYear());
    var c_month =parseInt(date_object.getMonth()+1);
    var c_date = parseInt(date_object.getDate());

    var dur_year = f_year-c_year;
    var dur_month = f_month-c_month;
    var dur_date = f_date-c_date;
    // console.log(dur_year);
    // console.log(dur_month);
    // console.log(dur_date);


    if (dur_year*365+dur_month*31+dur_date<0){
      alert("Please select a valid date in the future")
    }else{
      return dur_year*365 + dur_month*31 + dur_date;
    }

    return -1
  }

  function getCurrentDateTime(){
    var date_object = new Date(); 
    var c_year = parseInt(date_object.getFullYear());
    var c_month =parseInt(date_object.getMonth()+1);
    var c_day = parseInt(date_object.getDate());
    var c_hr = parseInt(date_object.getHours());
    var c_min = parseInt(date_object.getMinutes());
    var c_sec = parseInt(date_object.getSeconds());

    return [c_year,c_month,c_day,c_hr,c_min,c_sec];
  }

  function getCurrentDateTimeInSecs(){
    var date_object = new Date(); 
    var c_year = parseInt(date_object.getFullYear());
    var c_month =parseInt(date_object.getMonth()+1);
    var c_day = parseInt(date_object.getDate());
    var c_hr = parseInt(date_object.getHours());
    var c_min = parseInt(date_object.getMinutes());
    var c_sec = parseInt(date_object.getSeconds());

    return (((c_year*365+c_month*31+c_day)*24 + c_hr)*60+c_min)*60 + c_sec;
  }

  function getFutureDateTime(){
    var f_date = $(".date").val().split("-");
    var f_year = parseInt(f_date[0]);
    var f_month = parseInt(f_date[1]);
    var f_day = parseInt(f_date[2]);
    var f_hr = parseInt(ac.thr.value);
    var f_min = parseInt(ac.thm.value);
    var f_sec = parseInt(ac.ths.value);

    return [f_year,f_month,f_day,f_hr,f_min,f_sec];
  }

  function getFutureDateTimeInSecs(){
    var f_date = $(".date").val().split("-");
    var f_year = parseInt(f_date[0]);
    var f_month = parseInt(f_date[1]);
    var f_day = parseInt(f_date[2]);
    var f_hr = parseInt(ac.thr.value);
    var f_min = parseInt(ac.thm.value);
    var f_sec = parseInt(ac.ths.value);
    return (((f_year*365+f_month*31+f_day)*24 + f_hr)*60+f_min)*60 + f_sec;
  }

  function todayCheckbox(){

    $("#include").prop("checked",true);
    // $(".v_75").prop("checked",false);
    $("#not_include").prop("checked",false);


     $("#include").on("click",function(){
        
        $("#not_include").prop("checked",false);
    });

    $("#not_include").on("click",function(){
        
      $("#include").prop("checked",false);
  });


  }

  var clockTimer;
  function startClockTimer(duration){
    clearInterval(clockTimer); 
    var i = 0;
    clockTimer = setInterval(() => {
          i++; 
          var time_left = duration-i; 
          var hrs =  parseInt(time_left/3600);
          var mins = parseInt(time_left%3600/60);
          var secs = time_left%3600%60;
      
          $(".timeLeftToGo").text(hrs + " hr(s) " + mins + " min(s) " + secs + " sec(s)");

          if (time_left<=0){
              // alert("Time to work on the task!")
              clearInterval(clockTimer); 
              // claimDeposit(); 
              clockSet =false; 
              // ac.reset(); 
              // enable_clock();

          }
  }, 1000);
  }

  
  // (G) START CLOCK ON PAGE LOAD
  window.addEventListener("load", ac.init);