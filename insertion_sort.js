class InsertionSort {
	constructor() {
		this.reset();
	}

	reset() {
		this.ARRAY = [];
		this.RES_ARRAY = [];
		this.DOM_NODES = [];
		this.COMPS = 0;
		this.IDX1 = 1;
		this.IDX2 = 1;
		this.SMALLEST = {value: 9999, index: -1};
		this.DESCRIPTION = document.getElementById("sort-description").firstChild;
		this.OVER = false;
		this.STARTED = false;
		this.HAS_SWAPPED = false;
	}

	init(boxes, speed = 2) {
		this.SPEED = speed;
		this.STARTED = true;
		for (let i = 0; i < boxes.length; i++) {
			this.DOM_NODES.push(boxes[i]);
			this.ARRAY.push({index: i, value: parseInt(boxes[i].innerText), left: i * 100});
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
		this.IDX1 = 1;
	}

	resetIDX2() {
		this.IDX2 = this.IDX1;
	}

	incrementIDX1() {
		this.IDX1 += 1;
	}

	decrementIDX2() {
		this.IDX2 -= 1;
	}

	highlightNumber(index) {
		this.DOM_NODES[index].classList.add("active");
		var t = this;
		setTimeout(function() {
			t.DOM_NODES[index].classList.remove("active");
		}, 1000 / this.SPEED);
	}

	isSorted(idx) {
		for (let i = 0; i + 1 < this.ARRAY.length; i++) {
			if (this.ARRAY[i].value > this.ARRAY[i + 1].value)
				return false;
		}
		return true;
	}

	sortPair() {
		this.DESCRIPTION.innerText = "Comparing";
		let first = parseInt(this.ARRAY[this.IDX2 - 1].value);
		let second = parseInt(this.ARRAY[this.IDX2].value);
		this.highlightNumber(this.ARRAY[this.IDX2 - 1].index);
		this.highlightNumber(this.ARRAY[this.IDX2].index);
		var t = this;
		setTimeout(function() {
			if (second < first) {
				t.HAS_SWAPPED = true;
				t.swap(t.IDX2 - 1, t.IDX2);
			}
			else {
				t.DESCRIPTION.innerText = "Moving to the next pair";
				if (t.IDX1 + 1 < t.ARRAY.length) {
					t.incrementIDX1();
					t.resetIDX2();
				}
				else {
					t.DESCRIPTION.innerText = "AND TA-DAAAAA !";
					t.OVER = true;
					return;
				}
				setTimeout(function() {
					t.sort();
				}, 1000 / t.SPEED);
			}
		}, 1000 / this.SPEED);
	}

	swap(i1, i2) {
		this.DESCRIPTION.innerText = "Swapping " + this.ARRAY[i1].value + " and " + this.ARRAY[i2].value;
		let dom_idx1 = this.ARRAY[i1].index;
		let dom_idx2 = this.ARRAY[i2].index;
		let elem1 = this.DOM_NODES[dom_idx1];
		let elem2 = this.DOM_NODES[dom_idx2];
		this.ARRAY[i1].left += 100;
		this.ARRAY[i2].left -= 100;
		elem1.style.left = "calc(50% - 493px + " + (this.ARRAY[i1].left) + "px)";
		elem2.style.left = "calc(50% - 493px + " + (this.ARRAY[i2].left) + "px)";
		let tmp = Object.assign(this.ARRAY[i1]);
		this.ARRAY[i1] = this.ARRAY[i2];
		this.ARRAY[i2] = tmp;
		var t = this;
		setTimeout(function() {
			t.DESCRIPTION.innerText = "Moving to the next pair";
			if (t.IDX1 < t.ARRAY.length) {
				t.HAS_SWAPPED = true;
				if (t.IDX2 > 1)
					t.decrementIDX2();
				else {
					t.incrementIDX1();
					t.resetIDX2();
				}
				t.sort()
			}
			else{
				t.DESCRIPTION.innerText = "AND TA-DAAAAA !";
				t.OVER = true;
			}
		}, 	1000 / this.SPEED);
	}

	sort() {
		this.sortPair();
	}
}