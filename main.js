import {runUI, addEmployeeUI, openTab, searchEmployeeUI} from './employees/ui-all';
import './style.css';

if (module.hot) {
    module.hot.accept();
}

module.hot.dispose(function (data) {
    // Очистка слушателей и передача данных data
    // в обновленный модуль
    data.info = "some info";
    console.log(module.hot.data.info);
});

window.addEmployeeUI = addEmployeeUI;
window.openTab = openTab;
window.searchEmployeeUI = searchEmployeeUI;
window.addEventListener("load", runUI);

