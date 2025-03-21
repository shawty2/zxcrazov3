	function getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return "";
    }

	function GetAppUrl(){
		var downloadUrl = apkUrl;
		if (isJsonString(downloadUrl)) {
			jsonUrl 	= JSON.parse(downloadUrl);
			jsonWeight 	= JSON.parse(apkWeight);
			downloadUrl = weightedRandom(jsonStr,jsonWeight);
		}
		console.info(downloadUrl);
        return downloadUrl;
	}

	function isJsonString(str) {
	    try {
	        jsonStr = JSON.parse(str);
	        return true;
	    } catch (e) {
	        return false;
	    }
	}

	function weightedRandom(items, weights) {
	    // 计算权重的累积和数组
	    let cumulativeWeights = [];
	    let sum = 0;

	    for (let weight of weights) {
	        sum += parseFloat(weight);
	        cumulativeWeights.push(sum);
	    }

	    // 生成一个介于 0 和累积权重总和之间的随机数
	    const random = Math.random() * sum;
	    console.log(sum);
		console.log(random);
	    // 根据随机数选择相应的项
	    for (let i = 0; i < cumulativeWeights.length; i++) {
	        if (random < cumulativeWeights[i]) {
	            return items[i];
	        }
	    }
	}

    var button = document.getElementById("installButton");
    button.onclick = function() {

    	clientDevice = getDeviceType();
		console.log(clientDevice);
		if (clientDevice=='iOS' && download_ios) {
			console.log(download_ios);
			window.location.href = download_ios;
			return false;
		}

        var apkURL = GetAppUrl();
        //return false;
        console.log("apkURL:" + apkURL);
		downloadAPK(apkURL);
		fbq('trackCustom', 'clickDownload');//点击下载
		postParameter();
		return false;
    }
	
	function postParameter(){
	 	try {
            var cookie_value = document.cookie;
			var fbc_value = getCookie('_fbc');
			var fbp_value = getCookie('_fbp');
			var p0= getQueryVariable("p0");
			var p1= getQueryVariable("p1");
			var p2= getQueryVariable("p2");
			var p3= getQueryVariable("p3");
			var p4= getQueryVariable("p4");
			var p5= getQueryVariable("p5");
			var p6= getQueryVariable("p6");
			var fbclid = getQueryVariable("fbclid");
			var fbpid = getQueryVariable("fbpid");
			var user_agent= navigator.userAgent;
            var  url= 'https://api.yoto.run/page/params?package_name='+packageName+'&p1='+p1+'&p2='+p2+'&p3='+p3+'&p4='+p4+'&p5='+p5+'&p6='+p6+'&fbclid='+fbc_value+'&fbpid='+fbp_value+'&remark='+cookie_value+'&http_user_agent='+user_agent;
			$.ajax({
			  	type: 'GET',
			  	url: url,
			  	success: function(response) {
					console.log(response);
			  	},
			  	error: function(error) {
					console.error('Error:', error);
			  	}
			});
				
		} catch (error) {
		   console.info(error);
 
		} finally {
		 
		}

	}
	
	function downloadAPK(apkURL) {
        var downloadLink = document.createElement('a');
        downloadLink.href = apkURL;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    function fbq_download_normal(){
    	fbq('trackCustom', 'clickDownload');//点击下载
		postParameter();
		return false;
    }

    function fbq_download_samsung(){
    	fbq('trackCustom', 'clickDownload_samsung');//点击下载
		return false;
    }

    function fbq_download_aws(){
    	fbq('trackCustom', 'clickDownload_aws');//点击下载
		return false;
    }

    function getDeviceType() {
		const userAgent = navigator.userAgent || navigator.vendor || window.opera;

		if (/android/i.test(userAgent)) {
			return 'Android';
		}
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			return 'iOS';
		}
		return 'unknown';
	}