var isMobile;

function isMobile() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  isMobile = check;
  return check;
};

function showLandscapeAlert() {
	document.getElementById("portrait-warning").style.display = "block";
	setTimeout(function() {
		document.getElementsByClassName("logo")[0].classList.add("active");
	}, 500);
}

window.addEventListener("orientationchange", function(e) {
	document.location.reload();
}, false);



if(isMobile() == true && window.innerHeight > window.innerWidth){
    showLandscapeAlert()
}
else {
	if (isMobile == true) {
		for (elem of document.getElementsByClassName("c_d"))
			elem.classList.add("mobile");
		document.getElementById("sort-description").classList.add("mobile");
		document.getElementById("sort-btn").classList.add("mobile");
	}
	let w_h = window.innerHeight;
	let w_w = window.innerWidth;

	var algorithms = {
		"selection_sort": new SelectionSort(isMobile),
		"bubble_sort": new BubbleSort(isMobile),
		"insertion_sort": new InsertionSort(isMobile)
	}

	const algo_names = [
		{
			"name": "Selection Sort",
			"id": "selection_sort",
		},
		{
			"name": "Bubble Sort",
			"id": "bubble_sort",
		},
		{
			"name": "Insertion Sort",
			"id": "insertion_sort"
		}
	];


	const title_caroussel = new VerticalCaroussel(document.getElementById("algo_type"), isMobile);

	for (title of algo_names) {
		title_caroussel.addTitle(title.name, title.id);
	}

	var old_algo = "selection_sort";
	var algo = "selection_sort";
	var selection_s;

	function createBox(index, nb = -1) {
		let li = document.createElement("div");
		li.classList.add("nb_b");
		li.classList.add(algo + "-outer");
		let div = document.createElement("div");
		div.classList.add("nb-" + index);
		div.classList.add("center");
		if (isMobile)
			div.classList.add("mobile");
		div.classList.add(algo + "-inner");
		div.innerText = nb;
		if (nb == -1)
			div.innerText = Math.floor(Math.random() * 100);
		li.appendChild(div);
		if (isMobile)
			li.style.left = index * 6 + 20.5 + "%";
		else
			li.style.left = "calc(50% - 493px + " + (index * 100) + "px)";
		return li;
	}

	function createBoxes() {
		selection_s = document.getElementById("sort");
		for (let i = 0; i < 10; i++) {
			let box = createBox(i);
			selection_s.appendChild(box);
		}
	}

	function start_animation(e) {
		let target = e.target;
		if (algorithms[old_algo].STARTED == true) {
			algorithms[old_algo].destroy();
			createBoxes();
		}
		let speed = parseInt(document.getElementById("sort-speed").value);
		algorithms[algo].init(selection_s.childNodes, speed)
		algorithms[algo].sort();
		old_algo = algo;
	}

	function change_speed(e) {
		let target = e.target;
		let value = parseInt(e.target.value);
		algorithms[algo].setSpeed(value);
	}

	let try_btns = document.getElementsByClassName("try-button");
	for (btn of try_btns) {
		btn.addEventListener('click', start_animation);
	}
	let speeds = document.getElementsByClassName("speed-input");
	for (speed of speeds) {
		speed.addEventListener('change', change_speed);
	}

	const algo_type = document.getElementById("algo_type");

	algo_type.addEventListener("mouseenter", function() {
		title_caroussel.show();
	});

	algo_type.addEventListener("mouseleave", function() {
		title_caroussel.hide();
	});

	algo_type.addEventListener("wheel", function(e) {
		title_caroussel.checkScroll(e)
		algo = title_caroussel.getSelectedNodeId();
	});

	createBoxes();
}