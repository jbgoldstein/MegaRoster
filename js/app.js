$(document).foundation()

const megaroster = {
    students: [],

    init() {
        this.studentList = document.querySelector('#student-list')
        this.max = 0
        this.setupEventListeners()
        this.load()
    },

    setupEventListeners() {
        document
            .querySelector('#new-student')
            .addEventListener('submit', this.addStudentViaForm.bind(this))
    },

    load() {
        const rosterString = localStorage.getItem('roster')
        const rosterArray = JSON.parse(rosterString)
        if (rosterArray) {
            rosterArray
                .reverse()
                .map(this.addStudent.bind(this))
        }
    },

    addStudentViaForm(ev) {
        ev.preventDefault()
        const f = ev.target
        const student = {
            id: this.max + 1,
            name: f.studentName.value,
        }

        this.addStudent(student)
        f.reset()
    },

    addStudent(student) {
        this.students.unshift(student)

        const listItem = this.buildListItem(student)
        this.prependChild(this.studentList, listItem)

        if (student.id > this.max) {
            max = student.id
        }
        this.save()
    },

    prependChild(parent, child) {
        parent.insertBefore(child, parent.firstChild)
    },

    buildListItem(student){
        const template = document.querySelector('.student.template')
        const li = template.cloneNode(true)
        li.querySelector('.student-name').textContent = student.name
        li.setAttribute('title', student.name)
        li.dataset.id = student.id

        if (student.promoted) {
            li.classList.add('promoted')
        }

        this.removeClassName(li, 'template')
        li
            .querySelector('button.remove')
            .addEventListener('click',this.removeStudent.bind(this))
        li
            .querySelector('button.promote')
            .addEventListener('click',this.promoteStudent.bind(this, student))
        return li
    },

    save() {
        localStorage.setItem('roster', JSON.stringify(this.students))
    },

    removeStudent(ev) {
        const btn = ev.target
        const closest = btn.closest('.student')
        const id = closest.dataset.id

        //Remove it from the students array
        for (let i = 0; i < this.students.length; i ++) {
            if (id == this.students[i].id) {
                this.students.splice(i,1)
                break
            }
        }

        this.save()
        closest.remove()
    },

    promoteStudent(student, ev) {
        const btn = ev.target
        const closest = btn.closest('.student')
        student.promoted = !students.promoted
        
        if (student.promoted) {
            li.classList.add('promoted')
        } else {
            li.classList.remove('promoted')
        }

        this.save()
    },

    removeClassName(el, className) {
        el.className = el.className.replace(className, '').trim()
    },
}

megaroster.init()