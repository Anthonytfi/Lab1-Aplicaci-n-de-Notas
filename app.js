document.addEventListener('DOMContentLoaded', () => {
    const noteText = document.getElementById('note-text');
    const saveBtn = document.getElementById('save-note-btn');
    const notesContainer = document.getElementById('notes-container');
    const snackbarElement = document.getElementById('snackbar');

    // Upgrade manual de componentes MDL
    componentHandler.upgradeElement(saveBtn);
    componentHandler.upgradeElement(snackbarElement);
    const snackbar = snackbarElement.MaterialSnackbar;

    // Función para mostrar Snackbar
    function showSnackbar(message) {
        if (snackbar) {
            snackbar.showSnackbar({
                message: message,
                timeout: 2750
            });
        } else {
            console.error('Snackbar no inicializado');
        }
    }

    // Función para añadir una nota
    function addNoteCard(text) {
        if (!text.trim()) {
            showSnackbar('La nota no puede estar vacía');
            return;
        }

        const cardHTML = `
            <div class="mdl-card mdl-shadow--2dp" style="width: 100%; margin-bottom: 16px;">
                <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">Nota</h2>
                </div>
                <div class="mdl-card__supporting-text">
                    ${text}
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent delete-btn">
                        Eliminar
                    </button>
                </div>
            </div>
        `;
        notesContainer.insertAdjacentHTML('beforeend', cardHTML);

        const deleteBtns = document.querySelectorAll('.delete-btn');
        const lastDeleteBtn = deleteBtns[deleteBtns.length - 1];
        componentHandler.upgradeElement(lastDeleteBtn);

        lastDeleteBtn.addEventListener('click', (e) => {
            e.target.closest('.mdl-card').remove();
            showSnackbar('Nota eliminada correctamente');
        });

        showSnackbar('Nota guardada correctamente');
        noteText.value = '';
        noteText.focus();
    }

    // Event listener para el botón de guardar
    saveBtn.addEventListener('click', () => {
        addNoteCard(noteText.value);
    });

    // Registro del Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then((registration) => {
                    console.log('Service Worker registrado con éxito:', registration);
                })
                .catch((error) => {
                    console.error('Error al registrar Service Worker:', error);
                });
        });
    }
});