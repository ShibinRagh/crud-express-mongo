var update = document.getElementById('update');
update.addEventListener('click', function(){
	fetch('quotes', {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			name: 'Shibin',
			quote: 'Do before you die.'
		})
	}).then(res => {
		if(res.ok) return res.json()
	}).then(data => {
		console.log(data);
	})
});

 