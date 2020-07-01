import React from "react";


export function getURLParams() {

    const params = new URLSearchParams(window.location.search);
    const activeTags = params.getAll('tags');
    const activeTab = params.get('tab');
    return {activeTab, activeTags}
}

export function setURLParams(payload) {

    const params = new URLSearchParams(window.location.search);
    const {activeTags = [], activeTab = null} = {...payload};
    params.set('tags', activeTags.join(','));
    params.set('tab', activeTab);
    window.history.pushState({}, '', `${window.location.pathname}?${params}`);
}

export function saveReadingProgress(payload) {
    const {itemsToRead, itemsInProgress, itemsDone} = {...payload};
    const progress = {
        'TO_READ': itemsToRead,
        'IN_PROGRESS': itemsInProgress,
        'DONE': itemsDone
    };
    const SAVED_PROGRESS = progress.json();
    window.localStorage.setItem('SAVED_PROGRESS', SAVED_PROGRESS);
}

export function loadReadingProgress() {
    const SAVED_PROGRESS = window.localStorage.getItem('SAVED_PROGRESS');
    const progress = JSON.parse(SAVED_PROGRESS);
    const itemsToRead = progress.TO_READ;
    const itemsInProgress = progress.IN_PROGRESS;
    const itemsDone = progress.DONE;
    return {itemsToRead, itemsInProgress, itemsDone};
}