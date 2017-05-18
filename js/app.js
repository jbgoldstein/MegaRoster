$(document).foundation()

const megaroster = {
    students: [],

    init() {
        this.studentList = document.querySelector('#student-list')
        this.max = 0
        this.setupEventListeners()
    },

    setupEventListeners() {
        document
            .querySelector('#new-student')
            .addEventListener('submit', this.addStudent.bind(this))
    },

    addStudent(ev) {
        ev.preventDefault()
        const f = ev.target
        const student = {
            id: this.max + 1,
            name: f.studentName.value,
        }

        this.students.unshift(student)

        const studentName = ev.target.studentName.value
        const listItem = this.buildListItem(student)
        this.prependChild(this.studentList, listItem)

        this.max ++
        f.reset()
    },

    prependChild(parent, child) {
        parent.insertBefore(child, parent.firstChild)
    },

    buildListItem(student){
        const template = document.querySelector('.student.template')
        const li = template.cloneNode(true)
        li.querySelector('.student-name').textContent = student.name
        li.dataset.id = student.id
        this.removeClassName(li, 'template')
        li
            .querySelector('button.remove')
            .addEventListener('click',this.removeStudent.bind(this))
        li
            .querySelector('button.promote')
            .addEventListener('click',this.promoteStudent.bind(this))
        return li
    },

    removeStudent(ev) {
        const btn = ev.target
        const closest = btn.closest('.student')
        const id = closest.dataset.id

        //Remove it from the students array
        for (let i = 0; i < this.students.length; i ++) {
            if (id == this.students[i].id) {
                this.students.splice(i,1)
            }
            else if (id < this.students[i].id) {
                this.students[i].id --
            }
        }

        closest.remove()
    },

    promoteStudent(ev) {
        const btn = ev.target
        const closest = btn.closest('.student')

        closest.className = 'student promoted'
    },

    removeClassName(el, className) {
        el.className = el.className.replace(className, '').trim()
    },
}

megaroster.init()