var Notes = function () {
    var _notes = [];
    function fetchAllNotesFromLocalStorage() {
        _notes = LocalStorage.get('notes');
        if (_notes == null) {
            _notes = [];
        }
    }

    function addNewNote(note) {
        _notes.push(note)
        saveNotes()
        return _notes.length - 1
    }

    function deleteNote(index) {
        _notes.splice(index, 1)
        saveNotes()
    }

    function editNote(index, note) {
        _notes[index] = note
        saveNotes()
    }

    function saveNotes() {
        LocalStorage.set("notes", _notes)
    }

    return {
        init: function () {
            fetchAllNotesFromLocalStorage()
        },
        getAllNotes: function () {
            return _notes
        },
        getNote: function (index) {
            return _notes[index]
        },
        add: function (note) {
            return addNewNote(note)
        },
        delete: function (index) {
            deleteNote(index)
        },
        edit: function (index, note) {
            editNote(index, note)
        }
    }
}


var NotesUI = function () {
    var _parentContainer = null;
    var _note = null
    function displayAllNotes() {
       
        var notes = _note.getAllNotes()
        $(_parentContainer).html('')
        notes.forEach((note, index) => {
            addNoteToContainer(note, index)
        });
        addEditModal()
        initListeners()

    }

    function addEditModal(note = { title: "", content: "" }) {
        $("body").append(`<div class="modal fade" id="add_note_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                                <div class="modal-body">
                                    <form class="" id="addNotes">
                                        <input type="hidden" name="index" value="-1">
                                        <div class="form-group">
                                            <label class=""> Title</label>
                                            <input class="form-control" type="text" name="title" value="`+ note.title + `" placeholder="Title">
                                        </div>
                                        <div class="form-group">
                                            <label class=""> Content</label>
                                            <textarea class="form-control" type="text" name="content" placeholder="Content">`+ note.content + `</textarea>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" id="btn_save">Save</button>
                                </div>
                            </div>
                            </div>
                        </div>`)

    }

    function setDataToModal(note = { title: "", content: "" }, index=-1) {
        $("#add_note_modal input[name=index]").val(index)
        $("#add_note_modal input[name=title]").val(note.title)
        $("#add_note_modal textarea[name=content]").val(note.content)
        $("#add_note_modal").modal("show")
    }

    function addNoteToContainer(note, index) {
        $(_parentContainer).append(`<div class="col-md-3 mb-4">
        <div class="card card_wrapper" data-index=`+ index + ` >
            <div class="card-header d-flex justify-content-between">
                <h5 class="mb-0 card-title">
                    `+ note.title + `
                </h5>
                <div class="">
                    <button class="btn btn-secondary edit_note"><i class="fas fa-pencil-alt"></i></button>
                    <button class="btn btn-danger delete_note"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="card-body">
                <div class="n_content">
                    `+ note.content + `
                </div>
            </div>
        </div>
    </div>`)
    }


    function initListeners() {
        $(_addButton).on("click", function (e) {
            setDataToModal()
        })

        $(".edit_note").on("click", function (e) {
            let index = $(this).parents(".card_wrapper").data("index")
            setDataToModal(_note.getNote(index), index)
        })
        $(".delete_note").on("click", function (e) {
            let index = $(this).parents(".card_wrapper").data("index")
            _note.delete(index)
            displayAllNotes()
        })
        $("#btn_save").on("click", function (e) {
            var index = $("#addNotes input[name=index]").val()
            var note = {
                title: $("#addNotes input[name=title]").val(),
                content: $("#addNotes textarea[name=content]").val()
            }
            if(index == -1){
                var index = _note.add(note)
                addNoteToContainer(note, index)
            }else{
                _note.edit(index, note)
                displayAllNotes()
            }
            $("#add_note_modal").modal("hide")
        })
    }


    return {
        init: function (selector, addButton) {
            _parentContainer = selector
            _addButton = addButton
            _note = Notes()
            _note.init()
            displayAllNotes()
        }
    }
}