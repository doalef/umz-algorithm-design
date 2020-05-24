export function frSelection(
	array,
	k,
	compare = (a, b) => {
		return a < b ? -1 : a > b ? 1 : 0;
	},
	left = 0,
	right = array.length - 1
) {
	while (right > left) {
		if (right - left > 600) {
			const n = right - left + 1;
			const m = k - left + 1;
			const z = Math.log(n);
			const s = 0.5 * Math.exp((2 * z) / 3);
			const sd =
				0.5 *
				Math.sqrt((z * s * (n - s)) / n) *
				(m - n / 2 < 0 ? -1 : 1);
			const newLeft = Math.max(left, Math.floor(k - (m * s) / n + sd));
			const newRight = Math.min(
				right,
				Math.floor(k + ((n - m) * s) / n + sd)
			);
			frSelection(array, k, compare, newLeft, newRight);
		}
		// partition the elements between left and right around t
		const t = array[k];
		let i = left;
		let j = right;
		// swap array[left] and array[k]
		[array[left], array[k]] = [t, array[left]];
		if (compare(array[right], t) > 0) {
			// swap array[right] and array[left]
			[array[left], array[right]] = [array[right], array[left]];
		}
		while (i < j) {
			// swap array[i] and array[j]
			[array[i], array[j]] = [array[j], array[i]];
			do i++;
			while (compare(array[i], t) < 0);
			do j--;
			while (compare(array[j], t) > 0);
		}
		if (compare(array[left], t) === 0) {
			// swap array[left] and array[j]
			[array[left], array[j]] = [array[j], array[left]];
		} else {
			j++; // swap array[right] and array[j]
			[array[right], array[j]] = [array[j], array[right]];
		}
		// adjust left and right towards the boundaries of the subset
		// containing the (k - left + 1)th smallest element
		if (j <= k) left = j + 1;
		if (k <= j) right = j - 1;
	}
	return array[k];
}

export function mSelection(arr, k) {
	function partition(arr, left, right, pivot) {
		var temp = arr[pivot];
		arr[pivot] = arr[right];
		arr[right] = temp;
		var track = left;
		for (var i = left; i < right; i++) {
			if (arr[i] < arr[right]) {
				var t = arr[i];
				arr[i] = arr[track];
				arr[track] = t;
				track++;
			}
		}
		temp = arr[track];
		arr[track] = arr[right];
		arr[right] = temp;
		return track;
	}

	function selectIdx(arr, left, right, k) {
		if (left == right) {
			return arr[left];
		}
		var dest = left + k;
		while (true) {
			var pivotIndex =
				right - left + 1 <= 5
					? Math.floor(Math.random() * (right - left + 1)) + left
					: medianOfMedians(arr, left, right);
			pivotIndex = partition(arr, left, right, pivotIndex);
			if (pivotIndex == dest) return pivotIndex;
			else if (pivotIndex < dest) {
				left = pivotIndex + 1;
			} else {
				right = pivotIndex - 1;
			}
		}
	}

	function medianOfMedians(arr, left, right) {
		var numMedians = Math.ceil((right - left) / 5);
		for (var i = 0; i < numMedians; i++) {
			var subLeft = left + i * 5;
			var subRight = subLeft + 4;
			if (subRight > right) {
				subRight = right;
			}
			var medianIdx = selectIdx(
				arr,
				subLeft,
				subRight,
				Math.floor((subRight - subLeft) / 2)
			);
			var temp = arr[medianIdx];
			arr[medianIdx] = arr[left + i];
			arr[left + i] = temp;
		}
		return selectIdx(
			arr,
			left,
			left + numMedians - 1,
			Math.floor(numMedians / 2)
		);
	}
	if (!Array.isArray(arr) || arr.length == 0 || arr.length - 1 < k) {
		return;
	}
	var idx = selectIdx(arr, 0, arr.length - 1, k);
	return arr[idx];
}
