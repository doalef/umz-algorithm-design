function insertion(nums) {
	for (let i = 1; i < nums.length; i++) {
		let j = i - 1;
		let temp = nums[i];
		while (j >= 0 && nums[j] > temp) {
			nums[j + 1] = nums[j];
			j--;
		}
		nums[j + 1] = temp;
	}
	return nums;
}

function MergeSort(arr) {
	// Merges 2 sorted arrays
	function merge(left, right) {
		let result = [],
			i = 0,
			j = 0;

		while (i < left.length && j < right.length) {
			if (left[i] < right[j]) {
				result.push(left[i++]);
			} else {
				result.push(right[j++]);
			}
		}
		return result.concat(left.slice(i)).concat(right.slice(j));
	}
	let len = arr.length,
		middle,
		left,
		right;

	if (len < 2) {
		return arr;
	}

	middle = Math.floor(len / 2);

	left = arr.slice(0, middle);
	right = arr.slice(middle);

	return merge(MergeSort(left), MergeSort(right));
}

module.exports = {
	insertion,
	merge: MergeSort,
};
