import * as service from './service';

export * from './service';

export function removeEmployee(id) {
    service.doRemoveEmployee(id);
}