let t = [1, -1, 3]
t.push(5)
console.log(t.length)
console.log(t[1])
t.forEach(value => {
	console.log(value)
})
let i = [1,2,3]
const m1 = i.map(value => value*2)
console.log(m1)

const m2 = i.map(value => '<li>' + value + '</li>')
console.log(m2)

t = [1,2,3,4,5]
let [first,second, ...rest] = t
console.log(first, second)
console.log(rest)

let object3 = {
	name: {
		first: 'Dan',
		last: 'Abramov',
	},
	grades: [2,3,5,3], 
	department: 'Stanford University',
}
console.log(object3.name)
let fieldName = 'grades'
console.log(object3[fieldName])

object3.address = 'Helsinki'
object3['secret number'] = 12341

console.log(object3['address'])

const sum = (p1, p2) => {
	//if only one parameter can leave out parentheses so only have "p"
	console.log(p1)
	console.log(p2)
	return p1 + p2
}

const result = sum(1,5)
console.log(result)
