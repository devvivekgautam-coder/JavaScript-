let person = {
    name: "Vivek Gautam",
    age: 19,
    isStudent: true,
    marks: {
        maths: 20,
        science: 30,
        english: 40
    },
    totalNum: function () {
        let total =  this.marks.maths + this.marks.science + this.marks.english
        return total;
    }
}

console.log(person.totalNum());