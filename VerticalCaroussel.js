class VerticalCaroussel {
	constructor(parent, mobile) {
		let container = document.createElement("div");
		let titleContainer = document.createElement("div");
		container.classList.add("VCcontainer");
		titleContainer.classList.add("VCTitleContainer");
		container.appendChild(titleContainer);
		let selected_node = document.createElement("div");
		selected_node.classList.add("VCSelection");
		container.appendChild(selected_node);
		parent.appendChild(container);
		if (mobile) {
			container.classList.add("mobile");
			titleContainer.classList.add("mobile");
			selected_node.classList.add("mobile");
			parent.classList.add("mobile");
		}
		this.mobile = mobile;
		this.parent = titleContainer;
		this.data = [];
		this.selected = undefined;
		this.selectedIndex = 0;
		if (this.mobile)
			this.top = 1.45;
		else
			this.top = 45;
		var t = this;
		var ts;
		container.addEventListener('touchstart', function(e) {
			e.preventDefault();
		    ts = e.touches[0].clientY;
		});

		container.addEventListener('touchend', function(e) {
			e.preventDefault();
		    var te = e.changedTouches[0].clientY;
		    if (ts > te) {
		        t.scrollDown();
		    } else {
		        t.scrollUp();
		    }
		});
	}

	addTitle(name, id) {		
		let title = document.createElement("h1")
		title.classList.add("VCNode");
		if (this.mobile)
			title.classList.add("mobile");
		title.id = "VC" + id;
		title.innerText = name;
		if (this.data.length == 0) {
			this.selected = {"name": name, "id": id};
			title.classList.add("VCselected");
		}
		else {
			title.classList.add("hidden");
		}
		this.data.push({"name": name, "id": id});
		this.parent.appendChild(title);
	}

	checkScroll(e) {
		if (e.deltaY < 0) {
			this.scrollUp();
		}
		else
			this.scrollDown();
	}

	show() {
		let i = this.selectedIndex;
		this.parent.childNodes[this.selectedIndex + 1].classList.remove("hidden");
		if (this.selectedIndex > 0)
				this.parent.childNodes[this.selectedIndex - 1].classList.remove("hidden");
	}

	hide() {
		for (let i = 0; i < this.data.length; i++) {
			if (i != this.selectedIndex) {
				document.getElementById("VC" + this.data[i].id).classList.add("hidden");
			}
		}
	}

	scrollUp() {
		if (this.selectedIndex > 0) {
			if (this.mobile)
				this.top += 1.45;
			else
				this.top += 53;
			this.parent.childNodes[this.selectedIndex].classList.remove("VCselected");
			if (this.selectedIndex + 1 < this.data.length)
				this.parent.childNodes[this.selectedIndex + 1].classList.add("hidden");
			if (this.selectedIndex - 2 >= 0)
				this.parent.childNodes[this.selectedIndex - 2].classList.remove("hidden");
			this.selectedIndex -= 1;
			this.parent.childNodes[this.selectedIndex].classList.add("VCselected");
			if (this.mobile)
				this.parent.style.top = this.top + "rem";
			else
				this.parent.style.top = this.top + "px";
		}
	}

	scrollDown() {
		if (this.selectedIndex + 1 < this.data.length) {
			if (this.mobile)
				this.top -= 1.45;
			else
				this.top -= 53;
			this.parent.childNodes[this.selectedIndex].classList.remove("VCselected");
			if (this.selectedIndex - 1 >= 0)
				this.parent.childNodes[this.selectedIndex - 1].classList.add("hidden");
			if (this.selectedIndex + 2 < this.data.length)
				this.parent.childNodes[this.selectedIndex + 2].classList.remove("hidden");
			this.selectedIndex += 1;
			this.parent.childNodes[this.selectedIndex].classList.add("VCselected");
			if (this.mobile)
				this.parent.style.top = this.top + "rem";
			else
				this.parent.style.top = this.top + "px";
		}
	}

	getSelectedNodeId() {
		return this.data[this.selectedIndex].id;
	}
}