class SelectionSort {
	constructor(mobile) {
		this.mobile = mobile;
		this.reset();
	}

	reset() {
		this.ARRAY = [];
		this.RES_ARRAY = [];
		this.DOM_NODES = [];
		this.COMPS = 0;
		this.IDX1 = 0;
		this.IDX2 = 0;
		this.SMALLEST = {value: 9999, index: -1};
		this.DESCRIPTION = document.getElementById("sort-description").firstChild;
		this.OVER = false;
		this.STARTED = false;
	}

	init(boxes, speed = 2) {
		this.SPEED = speed;
		this.STARTED = true;
		for (let i = 0; i < boxes.length; i++) {
			this.DOM_NODES.push(boxes[i]);
			this.ARRAY.push({index: i, value: parseInt(boxes[i].innerText)});
		}
	}

	setSpeed(s) {
		this.SPEED = s;
	}

	isOver() {
		return this.OVER;
	}

	destroy() {
		document.getElementById("sort").innerHTML = "";
		this.reset();
	}

	resetIDX1() {
		this.IDX1 = 0;
	}

	resetIDX2() {
		this.IDX2 = 0;
	}

	incrementIDX1() {
		this.IDX1 += 1;
	}

	incrementIDX2() {
		this.IDX2 += 1;
	}

	highlightNumber(index) {
		this.DOM_NODES[index].classList.add("active");
		var t = this;
		setTimeout(function() {
			t.DOM_NODES[index].classList.remove("active");
		}, 1000 / this.SPEED);
	}

	isSmaller() {
		if (this.isSorted(this.IDX2) == true) {
			this.incrementIDX2();
			this.getSmallest();
			return;
		}
		let elem = this.ARRAY[this.IDX2];
		this.highlightNumber(this.IDX2);
		var t = this;
		if (elem.value < t.SMALLEST.value) {
				if (t.SMALLEST.index != -1) {
					t.DOM_NODES[t.SMALLEST.index].firstChild.style.border = "3px solid white";
					t.DOM_NODES[t.SMALLEST.index].firstChild.style.boxShadow = ""
				}
				t.DOM_NODES[t.IDX2].firstChild.style.border = "3px solid green";
				t.SMALLEST.value = elem.value;
				t.SMALLEST.index = elem.index;
			}
		setTimeout(function() {
			
			t.incrementIDX2();
			t.getSmallest();
		}, 1000 / this.SPEED);
	}

	isSorted(idx) {
		return this.RES_ARRAY.indexOf(idx) != -1;
	}

	getSmallest() {
		if (this.IDX2 == this.ARRAY.length) {
			this.DOM_NODES[this.SMALLEST.index].firstChild.style.border = "3px solid white";
			this.DOM_NODES[this.SMALLEST.index].firstChild.style.boxShadow = "";
			this.RES_ARRAY.push(this.SMALLEST.index);
			this.SMALLEST.value = 99999;
			this.SMALLEST.index = -1;
			this.move();
			return;
		}
		this.isSmaller();
	}

	move() {
		this.DESCRIPTION.innerText = "Moving the lowest value in the sorted array";
		let idx = this.RES_ARRAY[this.IDX1]
		this.highlightNumber(idx);
		let elem = this.DOM_NODES[idx]
		if (this.mobile) {
			elem.style.top = "4rem";
			elem.style.left = this.IDX1 * 6 + 20.5 + "%";
		}
		else {
			elem.style.top = 150 + "px";
			elem.style.left = "calc(50% - 493px + " + (this.IDX1 * 100) + "px)";
		}
		var t = this;
		setTimeout(function() {
			t.resetIDX2();
			t.incrementIDX1();
			if (t.IDX1 != t.ARRAY.length)
				t.sort()
			else{
				t.DESCRIPTION.innerText = "AND TA-DAAAAA !";
				t.OVER = true;
			}
		}, 	2000 / this.SPEED);
	}

	sort() {
		this.DESCRIPTION.innerText = "Searching for the lowest value";
		this.getSmallest();
	}
}