/* =========================================================
   i18n — every visible string lives here.
   German is the app's own language; English and Português
   are there for anyone else who picks up the phone.
   ========================================================= */
(function (global) {
  'use strict';

  var STR = {
    de: {
      'app.name': 'Meine Nistkästen',

      'nav.map': 'Karte', 'nav.houses': 'Nistkästen', 'nav.add': 'Neu', 'nav.stats': 'Zahlen',
      'nav.help': 'Hilfe', 'nav.settings': 'Einstellungen',

      'common.back': 'Zurück', 'common.next': 'Weiter', 'common.save': 'Speichern',
      'common.cancel': 'Abbrechen', 'common.delete': 'Löschen', 'common.close': 'Schließen',
      'common.done': 'Fertig', 'common.skip': 'Überspringen', 'common.edit': 'Ändern',
      'common.optional': 'freiwillig', 'common.notes': 'Notizen', 'common.finish': 'Fertig',
      'common.remove': 'Entfernen', 'common.none': 'Noch nichts',

      'map.locate': 'Zu meinem Standort', 'map.fit': 'Alle Nistkästen zeigen',
      'map.satellite': 'Luftbild', 'map.streets': 'Karte',
      'map.addHere': 'Nistkasten eintragen',
      'map.emptyTitle': 'Noch keine Nistkästen.',
      'map.emptyHint': 'Tippen Sie unten auf den grünen Knopf, um den ersten einzutragen.',
      'map.locating': 'Ihr Standort wird gesucht …',
      'map.locateFail': 'Ihr Standort wurde nicht gefunden. Schieben Sie die Karte mit dem Finger.',
      'map.tapPin': 'Tippen Sie auf einen Punkt, um den Nistkasten zu öffnen.',

      'list.sortBy': 'Sortieren nach', 'list.sortName': 'Name',
      'list.sortRecent': 'Zuletzt eingetragen', 'list.sortCondition': 'Kümmern zuerst',
      'list.empty': 'Noch keine Nistkästen.',
      'list.emptyHint': 'Tippen Sie unten auf „Neu“, um einen einzutragen.',

      'wiz.q1': '1. Wo hängt der Nistkasten?',
      'wiz.q1help': 'Schieben Sie die Karte, bis die Nadel auf der richtigen Stelle steht.',
      'wiz.q2': '2. Machen Sie ein Foto vom Baum',
      'wiz.q2help': 'So finden Sie den Nistkasten leichter wieder. Sie können das überspringen und später Fotos machen.',
      'wiz.q3': '3. Geben Sie ihm einen Namen',
      'wiz.q3help': 'Etwas, das Sie wiedererkennen, zum Beispiel „Große Eiche am Tor“.',
      'wiz.namePlaceholder': 'Große Eiche am Tor',
      'wiz.treeKind': 'An welchem Baum hängt er?',
      'wiz.treeKindPlaceholder': 'Eiche, Kiefer, Apfelbaum …',
      'wiz.condition': 'Wie ist der Nistkasten gerade in Schuss?',
      'wiz.putUp': 'Wann haben Sie ihn aufgehängt?',
      'wiz.savedTitle': 'Gespeichert!',
      'wiz.openHouse': 'Diesen Nistkasten öffnen',
      'wiz.addAnother': 'Noch einen eintragen',
      'wiz.takePhoto': 'Foto machen',
      'wiz.useMyLocation': 'Meinen Standort verwenden',
      'wiz.needName': 'Geben Sie dem Nistkasten bitte zuerst einen Namen.',
      'wiz.savedAs': 'Gespeichert: {name}',
      'wiz.suggest': 'Nistkasten {n}',

      'cond.good': 'Gut', 'cond.good.sub': 'Nichts zu tun',
      'cond.repair': 'Reparatur nötig', 'cond.repair.sub': 'Locker, rissig oder schmutzig',
      'cond.broken': 'Kaputt oder weg', 'cond.broken.sub': 'Zurzeit nicht benutzbar',
      'cond.unknown': 'Weiß ich nicht', 'cond.unknown.sub': 'Ich war länger nicht dort',

      'house.photos': 'Fotos vom Baum',
      'house.addPhoto': 'Foto hinzufügen',
      'house.birds': 'Hier gesehene Vögel',
      'house.maintenance': 'Reparaturen und Reinigung',
      'house.noBirds': 'Noch kein Vogel eingetragen.',
      'house.noMaint': 'Noch keine Reparatur oder Reinigung eingetragen.',
      'house.addBird': 'Ich habe hier einen Vogel gesehen',
      'house.addMaint': 'Ich habe geputzt oder repariert',
      'house.editHouse': 'Name oder Angaben ändern',
      'house.deleteHouse': 'Diesen Nistkasten löschen',
      'house.confirmDelete': '„{name}“ und alles Eingetragene löschen?',
      'house.showOnMap': 'Auf der Karte zeigen',
      'house.tree': 'Baum', 'house.placed': 'Aufgehängt am',
      'house.lastCheck': 'Zuletzt geputzt oder repariert', 'house.never': 'Noch nie',
      'house.condition': 'Zustand', 'house.notes': 'Notizen', 'house.details': 'Angaben',
      'house.editTitle': 'Angaben ändern', 'house.name': 'Name',
      'house.moveHint': 'Schieben Sie die Karte, um die Nadel zu versetzen.',
      'house.moveTitle': 'Wo hängt er?',

      'bird.title': 'Hier war ein Vogel',
      'bird.which': 'Welchen Vogel haben Sie gesehen?',
      'bird.pickSpecies': 'Wählen Sie bitte zuerst einen Vogel.',
      'bird.otherName': 'Wie hieß er?',
      'bird.when': 'Wann?',
      'bird.month': 'Monat', 'bird.year': 'Jahr',
      'bird.status': 'Was hat er gemacht?',
      'bird.nesting': 'Brütet drin', 'bird.nesting.sub': 'Eier oder Junge',
      'bird.visiting': 'Nur zu Besuch', 'bird.visiting.sub': 'Schaut sich um, frisst',
      'bird.roosting': 'Schläft drin', 'bird.roosting.sub': 'Benutzt ihn nachts',
      'bird.saveIt': 'Vogel speichern',
      'bird.search': 'Vogel suchen',
      'bird.searchPh': 'Name, z. B. Meise',
      'bird.clearSearch': 'Suche löschen',
      'bird.noMatch': 'Kein Vogel mit diesem Namen. Wählen Sie unten „Anderer Vogel“.',
      'bird.chosen': 'Ihre Wahl',
      'bird.tapToChoose': 'Tippen Sie auf einen Vogel.',
      'bird.moreCount': '{n} Vögel',

      'grp.recent': 'Schon einmal eingetragen',
      'grp.common': 'Die häufigsten Vögel',
      'grp.nest': 'Weitere Höhlen- und Nistkastenbrüter',
      'grp.specht': 'Spechte',
      'grp.garden': 'Garten- und Waldvögel',
      'grp.big': 'Große Vögel und Greifvögel',
      'grp.water': 'Wasservögel',
      'grp.other': 'Andere Gäste',

      'maint.title': 'Reinigung und Reparatur',
      'maint.what': 'Was haben Sie gemacht?',
      'maint.cleaned': 'Ausgeputzt', 'maint.repaired': 'Repariert',
      'maint.replaced': 'Neuen aufgehängt', 'maint.checked': 'Nur nachgesehen',
      'maint.when': 'Wann haben Sie das gemacht?',
      'maint.newCondition': 'Wie ist er jetzt?',
      'maint.saveIt': 'Arbeit speichern',

      'stats.title': 'Ihre Zahlen',
      'stats.totalHouses': 'Nistkästen',
      'stats.withBirds': 'Dieses Jahr bewohnt',
      'stats.needAttention': 'Brauchen Pflege',
      'stats.cleanedYear': 'Dieses Jahr geputzt',
      'stats.byCondition': 'Zustand Ihrer Nistkästen',
      'stats.topSpecies': 'Häufigste Vögel',
      'stats.topSpeciesSub': 'In wie vielen Nistkästen jeder Vogel gesehen wurde',
      'stats.byMonth': 'Wann die Vögel gesehen wurden',
      'stats.byMonthSub': 'Anzahl der Beobachtungen in jedem Monat',
      'stats.attention': 'Nistkästen zum Nachsehen',
      'stats.attentionSub': 'Kaputt, reparaturbedürftig oder seit über einem Jahr nicht geputzt',
      'stats.allGood': 'Alles in Ordnung. Nichts braucht Pflege.',
      'stats.empty': 'Tragen Sie den ersten Nistkasten ein, dann erscheinen hier die Zahlen.',
      'stats.year': 'Jahr', 'stats.allYears': 'Alle Jahre',
      'stats.showTable': 'Dasselbe als Liste zeigen',
      'stats.species': 'Vogel', 'stats.houses': 'Nistkästen', 'stats.count': 'Mal gesehen',
      'stats.month': 'Monat',
      'stats.totalSightings': 'Eingetragene Vögel',
      'stats.speciesCount': 'Verschiedene Vögel',
      'stats.noSightings': 'Für dieses Jahr ist noch kein Vogel eingetragen.',

      'settings.title': 'Einstellungen',
      'settings.language': 'Sprache',
      'settings.textSize': 'Schriftgröße',
      'settings.textSizeDesc': 'Ist die Schrift zu klein? Wählen Sie „Groß“.',
      'settings.textNormal': 'Normal', 'settings.textBig': 'Groß',
      'settings.backup': 'Ihre Angaben sichern',
      'settings.backupDesc': 'Alles liegt nur auf diesem Telefon. Speichern Sie ab und zu eine Kopie, damit nichts verloren geht.',
      'settings.saveBackup': 'Kopie auf dem Telefon speichern',
      'settings.restore': 'Gespeicherte Kopie laden',
      'settings.restoreDesc': 'Damit wird alles ersetzt, was jetzt auf diesem Telefon ist.',
      'settings.restoreBtn': 'Kopie auswählen',
      'settings.restoreConfirm': 'Alles auf diesem Telefon durch die gespeicherte Kopie ersetzen?',
      'settings.about': 'Über diese App',
      'settings.aboutText': 'Diese App funktioniert ohne Internet, nur die Kartenbilder kommen aus dem Netz. Es wird nichts verschickt — Ihre Nistkästen bleiben auf diesem Telefon.',
      'settings.install': 'Auf den Startbildschirm legen',
      'settings.installText': 'Öffnen Sie das Menü des Browsers und wählen Sie „Zum Startbildschirm hinzufügen“, dann lässt sich die App wie jede andere benutzen.',
      'settings.clearAll': 'Alles löschen',
      'settings.clearWarn': 'ALLE Nistkästen, Vögel, Reparaturen und Fotos löschen? Das lässt sich nicht rückgängig machen.',
      'settings.photos': 'Gespeicherte Fotos',

      'help.title': 'So wird es benutzt',
      'help.s1': 'Tippen Sie unten auf „Neu“. Schieben Sie die Karte, bis die Nadel auf Ihrem Nistkasten steht, machen Sie ein Foto vom Baum und geben Sie ihm einen Namen.',
      'help.s2': 'Auf der „Karte“ sehen Sie alle Ihre Nistkästen. Die Farbe des Punktes zeigt, wie es dem Kasten geht. Tippen Sie auf einen Punkt, um ihn zu öffnen.',
      'help.s3': 'Wenn Sie einen Vogel sehen, öffnen Sie den Nistkasten und tippen auf „Ich habe hier einen Vogel gesehen“. Wählen Sie den Vogel und den Monat.',
      'help.s4': 'Nach dem Putzen oder Reparieren tippen Sie auf „Ich habe geputzt oder repariert“. Das Datum merkt sich die App für Sie.',
      'help.s5': 'Der Bereich „Zahlen“ rechnet alles für Sie aus: wie viele Nistkästen Sie haben, welche Vögel am häufigsten sind und welche Kästen Sie nachsehen sollten.',
      'help.tip': 'Hinweis: Es wird nichts über das Internet verschickt. Alles bleibt auf diesem Telefon. Speichern Sie ab und zu in den Einstellungen eine Kopie.',

      'toast.saved': 'Gespeichert',
      'toast.deleted': 'Gelöscht',
      'toast.photoAdded': 'Foto hinzugefügt',
      'toast.photoFail': 'Dieses Foto konnte nicht gespeichert werden.',
      'toast.exported': 'Kopie in Ihren Downloads gespeichert',
      'toast.restored': 'Alles wurde zurückgeladen',
      'toast.restoreFail': 'Diese Datei konnte nicht gelesen werden.',
      'toast.cleared': 'Alles wurde gelöscht',
      'toast.storageFull': 'Auf diesem Telefon ist kein Platz mehr. Löschen Sie zuerst einige Fotos.',

      'month.1': 'Januar', 'month.2': 'Februar', 'month.3': 'März', 'month.4': 'April',
      'month.5': 'Mai', 'month.6': 'Juni', 'month.7': 'Juli', 'month.8': 'August',
      'month.9': 'September', 'month.10': 'Oktober', 'month.11': 'November', 'month.12': 'Dezember',
      'mon.1': 'Jan', 'mon.2': 'Feb', 'mon.3': 'Mär', 'mon.4': 'Apr', 'mon.5': 'Mai', 'mon.6': 'Jun',
      'mon.7': 'Jul', 'mon.8': 'Aug', 'mon.9': 'Sep', 'mon.10': 'Okt', 'mon.11': 'Nov', 'mon.12': 'Dez'
    },

    en: {
      'app.name': 'My Nest Boxes',

      'nav.map': 'Map', 'nav.houses': 'Boxes', 'nav.add': 'New', 'nav.stats': 'Numbers',
      'nav.help': 'Help', 'nav.settings': 'Settings',

      'common.back': 'Back', 'common.next': 'Next', 'common.save': 'Save',
      'common.cancel': 'Cancel', 'common.delete': 'Delete', 'common.close': 'Close',
      'common.done': 'Done', 'common.skip': 'Skip', 'common.edit': 'Edit',
      'common.optional': 'optional', 'common.notes': 'Notes', 'common.finish': 'Finish',
      'common.remove': 'Remove', 'common.none': 'None yet',

      'map.locate': 'Go to my location', 'map.fit': 'Show all nest boxes',
      'map.satellite': 'Satellite', 'map.streets': 'Map',
      'map.addHere': 'Add a nest box',
      'map.emptyTitle': 'No nest boxes yet.',
      'map.emptyHint': 'Tap the green button below to add your first one.',
      'map.locating': 'Looking for your location…',
      'map.locateFail': 'Could not find your location. Move the map by hand instead.',
      'map.tapPin': 'Tap a pin to open a nest box.',

      'list.sortBy': 'Sort by', 'list.sortName': 'Name',
      'list.sortRecent': 'Recently added', 'list.sortCondition': 'Needs attention first',
      'list.empty': 'No nest boxes yet.',
      'list.emptyHint': 'Use the “New” button at the bottom to add one.',

      'wiz.q1': '1. Where is the nest box?',
      'wiz.q1help': 'Move the map until the pin sits on the right spot.',
      'wiz.q2': '2. Take a photo of the tree',
      'wiz.q2help': 'This helps you find the nest box again. You can skip this and add photos later.',
      'wiz.q3': '3. Give it a name',
      'wiz.q3help': 'Something you will recognise, like “Big oak by the gate”.',
      'wiz.namePlaceholder': 'Big oak by the gate',
      'wiz.treeKind': 'What kind of tree is it on?',
      'wiz.treeKindPlaceholder': 'Oak, pine, apple tree…',
      'wiz.condition': 'How is the nest box right now?',
      'wiz.putUp': 'When did you put it up?',
      'wiz.savedTitle': 'Saved!',
      'wiz.openHouse': 'Open this nest box',
      'wiz.addAnother': 'Add another one',
      'wiz.takePhoto': 'Take a photo',
      'wiz.useMyLocation': 'Use my location',
      'wiz.needName': 'Please give the nest box a name first.',
      'wiz.savedAs': 'You saved: {name}',
      'wiz.suggest': 'Nest box {n}',

      'cond.good': 'Good', 'cond.good.sub': 'Nothing to do',
      'cond.repair': 'Needs a repair', 'cond.repair.sub': 'Loose, cracked or dirty',
      'cond.broken': 'Broken or gone', 'cond.broken.sub': 'Cannot be used now',
      'cond.unknown': 'Not sure', 'cond.unknown.sub': 'I have not looked lately',

      'house.photos': 'Photos of the tree',
      'house.addPhoto': 'Add a photo',
      'house.birds': 'Birds seen here',
      'house.maintenance': 'Repairs and cleaning',
      'house.noBirds': 'No birds written down yet.',
      'house.noMaint': 'No repairs or cleaning written down yet.',
      'house.addBird': 'I saw a bird here',
      'house.addMaint': 'I cleaned or repaired it',
      'house.editHouse': 'Change name or details',
      'house.deleteHouse': 'Delete this nest box',
      'house.confirmDelete': 'Delete “{name}” and everything written down about it?',
      'house.showOnMap': 'Show on the map',
      'house.tree': 'Tree', 'house.placed': 'Put up on',
      'house.lastCheck': 'Last cleaned or repaired', 'house.never': 'Never',
      'house.condition': 'Condition', 'house.notes': 'Notes', 'house.details': 'Details',
      'house.editTitle': 'Change details', 'house.name': 'Name',
      'house.moveHint': 'Move the map to change where the pin sits.',
      'house.moveTitle': 'Where is it?',

      'bird.title': 'A bird was here',
      'bird.which': 'Which bird did you see?',
      'bird.pickSpecies': 'Please choose a bird first.',
      'bird.otherName': 'What was it called?',
      'bird.when': 'When?',
      'bird.month': 'Month', 'bird.year': 'Year',
      'bird.status': 'What was it doing?',
      'bird.nesting': 'Nesting inside', 'bird.nesting.sub': 'Eggs or young birds',
      'bird.visiting': 'Just visiting', 'bird.visiting.sub': 'Looking around, feeding',
      'bird.roosting': 'Sleeping inside', 'bird.roosting.sub': 'Using it at night',
      'bird.saveIt': 'Save this bird',
      'bird.search': 'Search for a bird',
      'bird.searchPh': 'Name, e.g. tit',
      'bird.clearSearch': 'Clear the search',
      'bird.noMatch': 'No bird with that name. Choose “Another bird” below.',
      'bird.chosen': 'Your choice',
      'bird.tapToChoose': 'Tap a bird.',
      'bird.moreCount': '{n} birds',

      'grp.recent': 'Written down before',
      'grp.common': 'The most common birds',
      'grp.nest': 'Other hole and nest box nesters',
      'grp.specht': 'Woodpeckers',
      'grp.garden': 'Garden and woodland birds',
      'grp.big': 'Large birds and birds of prey',
      'grp.water': 'Water birds',
      'grp.other': 'Other guests',

      'maint.title': 'Cleaning and repairs',
      'maint.what': 'What did you do?',
      'maint.cleaned': 'Cleaned it out', 'maint.repaired': 'Repaired it',
      'maint.replaced': 'Put up a new one', 'maint.checked': 'Just had a look',
      'maint.when': 'When did you do it?',
      'maint.newCondition': 'How is it now?',
      'maint.saveIt': 'Save this job',

      'stats.title': 'Your numbers',
      'stats.totalHouses': 'Nest boxes',
      'stats.withBirds': 'Used by birds this year',
      'stats.needAttention': 'Need attention',
      'stats.cleanedYear': 'Cleaned this year',
      'stats.byCondition': 'Condition of your nest boxes',
      'stats.topSpecies': 'Most common birds',
      'stats.topSpeciesSub': 'How many nest boxes each bird was seen in',
      'stats.byMonth': 'When birds were seen',
      'stats.byMonthSub': 'Number of sightings in each month',
      'stats.attention': 'Nest boxes to look at',
      'stats.attentionSub': 'Broken, needing repair, or not cleaned for over a year',
      'stats.allGood': 'Everything looks fine. Nothing needs attention.',
      'stats.empty': 'Add your first nest box and the numbers will appear here.',
      'stats.year': 'Year', 'stats.allYears': 'All years',
      'stats.showTable': 'Show the same thing as a list',
      'stats.species': 'Bird', 'stats.houses': 'Nest boxes', 'stats.count': 'Times seen',
      'stats.month': 'Month',
      'stats.totalSightings': 'Birds written down',
      'stats.speciesCount': 'Different birds',
      'stats.noSightings': 'No birds written down yet for this year.',

      'settings.title': 'Settings',
      'settings.language': 'Language',
      'settings.textSize': 'Text size',
      'settings.textSizeDesc': 'Is the writing too small? Choose “Large”.',
      'settings.textNormal': 'Normal', 'settings.textBig': 'Large',
      'settings.backup': 'Keep your information safe',
      'settings.backupDesc': 'Everything is kept on this phone only. Save a copy from time to time, so nothing is lost.',
      'settings.saveBackup': 'Save a copy to my phone',
      'settings.restore': 'Load a saved copy',
      'settings.restoreDesc': 'This will replace everything that is on this phone now.',
      'settings.restoreBtn': 'Choose a saved copy',
      'settings.restoreConfirm': 'Replace everything on this phone with the saved copy?',
      'settings.about': 'About',
      'settings.aboutText': 'This app works without internet, except for the map pictures. Nothing is sent anywhere — your nest boxes stay on this phone.',
      'settings.install': 'Add to home screen',
      'settings.installText': 'Open the browser menu and choose “Add to Home screen” to use this like a normal app.',
      'settings.clearAll': 'Delete everything',
      'settings.clearWarn': 'Delete ALL nest boxes, birds, repairs and photos? This cannot be undone.',
      'settings.photos': 'Photos saved',

      'help.title': 'How to use this',
      'help.s1': 'Tap “New” at the bottom. Move the map so the pin is on your nest box, then take a photo of the tree and give it a name.',
      'help.s2': 'On the “Map” tab you see all your nest boxes. The colour of the pin shows how the box is doing. Tap a pin to open it.',
      'help.s3': 'When you see a bird, open that nest box and tap “I saw a bird here”. Choose the bird and the month.',
      'help.s4': 'After cleaning or fixing a box, tap “I cleaned or repaired it”. The app remembers the date for you.',
      'help.s5': 'The “Numbers” tab counts everything for you: how many boxes you have, which birds are the most common, and which boxes need a look.',
      'help.tip': 'Tip: nothing is sent over the internet. Everything stays on this phone. Save a copy now and then in Settings.',

      'toast.saved': 'Saved',
      'toast.deleted': 'Deleted',
      'toast.photoAdded': 'Photo added',
      'toast.photoFail': 'That photo could not be saved.',
      'toast.exported': 'Copy saved to your downloads',
      'toast.restored': 'Everything was loaded back',
      'toast.restoreFail': 'That file could not be read.',
      'toast.cleared': 'Everything was deleted',
      'toast.storageFull': 'There is no more room on this phone. Delete some photos first.',

      'month.1': 'January', 'month.2': 'February', 'month.3': 'March', 'month.4': 'April',
      'month.5': 'May', 'month.6': 'June', 'month.7': 'July', 'month.8': 'August',
      'month.9': 'September', 'month.10': 'October', 'month.11': 'November', 'month.12': 'December',
      'mon.1': 'Jan', 'mon.2': 'Feb', 'mon.3': 'Mar', 'mon.4': 'Apr', 'mon.5': 'May', 'mon.6': 'Jun',
      'mon.7': 'Jul', 'mon.8': 'Aug', 'mon.9': 'Sep', 'mon.10': 'Oct', 'mon.11': 'Nov', 'mon.12': 'Dec'
    },

    pt: {
      'app.name': 'As Minhas Casinhas de Pássaros',

      'nav.map': 'Mapa', 'nav.houses': 'Casinhas', 'nav.add': 'Nova', 'nav.stats': 'Contas',
      'nav.help': 'Ajuda', 'nav.settings': 'Definições',

      'common.back': 'Voltar', 'common.next': 'Seguinte', 'common.save': 'Guardar',
      'common.cancel': 'Cancelar', 'common.delete': 'Apagar', 'common.close': 'Fechar',
      'common.done': 'Pronto', 'common.skip': 'Saltar', 'common.edit': 'Alterar',
      'common.optional': 'opcional', 'common.notes': 'Notas', 'common.finish': 'Terminar',
      'common.remove': 'Retirar', 'common.none': 'Ainda nada',

      'map.locate': 'Ir para o meu sítio', 'map.fit': 'Ver todas as casinhas',
      'map.satellite': 'Satélite', 'map.streets': 'Mapa',
      'map.addHere': 'Juntar uma casinha',
      'map.emptyTitle': 'Ainda não há casinhas.',
      'map.emptyHint': 'Toque no botão verde aqui em baixo para juntar a primeira.',
      'map.locating': 'A procurar onde está…',
      'map.locateFail': 'Não foi possível encontrar o seu sítio. Mova o mapa com o dedo.',
      'map.tapPin': 'Toque num pino para abrir a casinha.',

      'list.sortBy': 'Ordenar por', 'list.sortName': 'Nome',
      'list.sortRecent': 'Juntadas há pouco', 'list.sortCondition': 'Precisam de atenção',
      'list.empty': 'Ainda não há casinhas.',
      'list.emptyHint': 'Use o botão “Nova” lá em baixo para juntar uma.',

      'wiz.q1': '1. Onde fica a casinha?',
      'wiz.q1help': 'Mova o mapa até o pino ficar no sítio certo.',
      'wiz.q2': '2. Tire uma foto da árvore',
      'wiz.q2help': 'Assim é mais fácil encontrar a casinha outra vez. Pode saltar e juntar fotos depois.',
      'wiz.q3': '3. Dê-lhe um nome',
      'wiz.q3help': 'Algo que reconheça, como “Carvalho grande ao pé do portão”.',
      'wiz.namePlaceholder': 'Carvalho ao pé do portão',
      'wiz.treeKind': 'Em que árvore está?',
      'wiz.treeKindPlaceholder': 'Carvalho, pinheiro, macieira…',
      'wiz.condition': 'Como está a casinha agora?',
      'wiz.putUp': 'Quando é que a pôs?',
      'wiz.savedTitle': 'Guardado!',
      'wiz.openHouse': 'Abrir esta casinha',
      'wiz.addAnother': 'Juntar outra',
      'wiz.takePhoto': 'Tirar uma foto',
      'wiz.useMyLocation': 'Usar o meu sítio',
      'wiz.needName': 'Escreva primeiro um nome para a casinha.',
      'wiz.savedAs': 'Guardou: {name}',
      'wiz.suggest': 'Casinha {n}',

      'cond.good': 'Boa', 'cond.good.sub': 'Não é preciso fazer nada',
      'cond.repair': 'Precisa de arranjo', 'cond.repair.sub': 'Solta, rachada ou suja',
      'cond.broken': 'Partida ou perdida', 'cond.broken.sub': 'Não se pode usar agora',
      'cond.unknown': 'Não sei', 'cond.unknown.sub': 'Não fui lá ver há muito tempo',

      'house.photos': 'Fotos da árvore',
      'house.addPhoto': 'Juntar uma foto',
      'house.birds': 'Pássaros vistos aqui',
      'house.maintenance': 'Arranjos e limpezas',
      'house.noBirds': 'Ainda não escreveu nenhum pássaro.',
      'house.noMaint': 'Ainda não escreveu nenhum arranjo ou limpeza.',
      'house.addBird': 'Vi um pássaro aqui',
      'house.addMaint': 'Limpei ou arranjei',
      'house.editHouse': 'Mudar o nome ou os dados',
      'house.deleteHouse': 'Apagar esta casinha',
      'house.confirmDelete': 'Apagar “{name}” e tudo o que está escrito sobre ela?',
      'house.showOnMap': 'Ver no mapa',
      'house.tree': 'Árvore', 'house.placed': 'Posta em',
      'house.lastCheck': 'Última limpeza ou arranjo', 'house.never': 'Nunca',
      'house.condition': 'Estado', 'house.notes': 'Notas', 'house.details': 'Dados',
      'house.editTitle': 'Mudar os dados', 'house.name': 'Nome',
      'house.moveHint': 'Mova o mapa para mudar o sítio do pino.',
      'house.moveTitle': 'Onde fica?',

      'bird.title': 'Esteve aqui um pássaro',
      'bird.which': 'Que pássaro viu?',
      'bird.pickSpecies': 'Escolha primeiro um pássaro.',
      'bird.otherName': 'Como se chamava?',
      'bird.when': 'Quando?',
      'bird.month': 'Mês', 'bird.year': 'Ano',
      'bird.status': 'O que estava a fazer?',
      'bird.nesting': 'A fazer ninho', 'bird.nesting.sub': 'Ovos ou crias',
      'bird.visiting': 'Só de visita', 'bird.visiting.sub': 'A espreitar, a comer',
      'bird.roosting': 'A dormir lá dentro', 'bird.roosting.sub': 'Usa à noite',
      'bird.saveIt': 'Guardar este pássaro',
      'bird.search': 'Procurar um pássaro',
      'bird.searchPh': 'Nome, p. ex. chapim',
      'bird.clearSearch': 'Limpar a procura',
      'bird.noMatch': 'Nenhum pássaro com esse nome. Escolha “Outro pássaro” em baixo.',
      'bird.chosen': 'A sua escolha',
      'bird.tapToChoose': 'Toque num pássaro.',
      'bird.moreCount': '{n} pássaros',

      'grp.recent': 'Já escritos antes',
      'grp.common': 'Os pássaros mais comuns',
      'grp.nest': 'Outros que usam buracos e casinhas',
      'grp.specht': 'Pica-paus',
      'grp.garden': 'Pássaros do jardim e da mata',
      'grp.big': 'Pássaros grandes e aves de rapina',
      'grp.water': 'Aves de água',
      'grp.other': 'Outros visitantes',

      'maint.title': 'Limpezas e arranjos',
      'maint.what': 'O que é que fez?',
      'maint.cleaned': 'Limpei por dentro', 'maint.repaired': 'Arranjei',
      'maint.replaced': 'Pus uma nova', 'maint.checked': 'Só fui ver',
      'maint.when': 'Quando é que fez isso?',
      'maint.newCondition': 'Como está agora?',
      'maint.saveIt': 'Guardar este trabalho',

      'stats.title': 'As suas contas',
      'stats.totalHouses': 'Casinhas',
      'stats.withBirds': 'Com pássaros este ano',
      'stats.needAttention': 'Precisam de atenção',
      'stats.cleanedYear': 'Limpas este ano',
      'stats.byCondition': 'Estado das suas casinhas',
      'stats.topSpecies': 'Pássaros mais comuns',
      'stats.topSpeciesSub': 'Em quantas casinhas cada pássaro foi visto',
      'stats.byMonth': 'Quando os pássaros foram vistos',
      'stats.byMonthSub': 'Número de vezes em cada mês',
      'stats.attention': 'Casinhas para ir ver',
      'stats.attentionSub': 'Partidas, a precisar de arranjo, ou sem limpeza há mais de um ano',
      'stats.allGood': 'Está tudo bem. Nada precisa de atenção.',
      'stats.empty': 'Junte a primeira casinha e as contas aparecem aqui.',
      'stats.year': 'Ano', 'stats.allYears': 'Todos os anos',
      'stats.showTable': 'Ver o mesmo numa lista',
      'stats.species': 'Pássaro', 'stats.houses': 'Casinhas', 'stats.count': 'Vezes visto',
      'stats.month': 'Mês',
      'stats.totalSightings': 'Pássaros escritos',
      'stats.speciesCount': 'Pássaros diferentes',
      'stats.noSightings': 'Ainda não escreveu pássaros neste ano.',

      'settings.title': 'Definições',
      'settings.language': 'Idioma',
      'settings.textSize': 'Tamanho da letra',
      'settings.textSizeDesc': 'A letra está pequena? Escolha “Grande”.',
      'settings.textNormal': 'Normal', 'settings.textBig': 'Grande',
      'settings.backup': 'Guardar tudo em segurança',
      'settings.backupDesc': 'Tudo fica só neste telemóvel. Guarde uma cópia de vez em quando, para não perder nada.',
      'settings.saveBackup': 'Guardar uma cópia no telemóvel',
      'settings.restore': 'Carregar uma cópia guardada',
      'settings.restoreDesc': 'Isto substitui tudo o que está agora neste telemóvel.',
      'settings.restoreBtn': 'Escolher uma cópia guardada',
      'settings.restoreConfirm': 'Substituir tudo o que está neste telemóvel pela cópia guardada?',
      'settings.about': 'Sobre',
      'settings.aboutText': 'Esta aplicação funciona sem internet, tirando as imagens do mapa. Nada é enviado para lado nenhum — as suas casinhas ficam neste telemóvel.',
      'settings.install': 'Pôr no ecrã inicial',
      'settings.installText': 'Abra o menu do navegador e escolha “Adicionar ao ecrã principal” para usar isto como uma aplicação normal.',
      'settings.clearAll': 'Apagar tudo',
      'settings.clearWarn': 'Apagar TODAS as casinhas, pássaros, arranjos e fotos? Isto não se pode desfazer.',
      'settings.photos': 'Fotos guardadas',

      'help.title': 'Como se usa',
      'help.s1': 'Toque em “Nova” lá em baixo. Mova o mapa até o pino ficar na sua casinha, tire uma foto da árvore e dê-lhe um nome.',
      'help.s2': 'No separador “Mapa” vê todas as suas casinhas. A cor do pino mostra como está a casinha. Toque num pino para a abrir.',
      'help.s3': 'Quando vir um pássaro, abra essa casinha e toque em “Vi um pássaro aqui”. Escolha o pássaro e o mês.',
      'help.s4': 'Depois de limpar ou arranjar uma casinha, toque em “Limpei ou arranjei”. A aplicação guarda a data por si.',
      'help.s5': 'O separador “Contas” faz as contas por si: quantas casinhas tem, quais os pássaros mais comuns, e quais as casinhas que precisam de ser vistas.',
      'help.tip': 'Nota: nada é enviado pela internet. Fica tudo neste telemóvel. Guarde uma cópia de vez em quando nas Definições.',

      'toast.saved': 'Guardado',
      'toast.deleted': 'Apagado',
      'toast.photoAdded': 'Foto juntada',
      'toast.photoFail': 'Não foi possível guardar essa foto.',
      'toast.exported': 'Cópia guardada nas suas transferências',
      'toast.restored': 'Está tudo carregado outra vez',
      'toast.restoreFail': 'Não foi possível ler esse ficheiro.',
      'toast.cleared': 'Foi tudo apagado',
      'toast.storageFull': 'Já não há espaço neste telemóvel. Apague algumas fotos primeiro.',

      'month.1': 'Janeiro', 'month.2': 'Fevereiro', 'month.3': 'Março', 'month.4': 'Abril',
      'month.5': 'Maio', 'month.6': 'Junho', 'month.7': 'Julho', 'month.8': 'Agosto',
      'month.9': 'Setembro', 'month.10': 'Outubro', 'month.11': 'Novembro', 'month.12': 'Dezembro',
      'mon.1': 'Jan', 'mon.2': 'Fev', 'mon.3': 'Mar', 'mon.4': 'Abr', 'mon.5': 'Mai', 'mon.6': 'Jun',
      'mon.7': 'Jul', 'mon.8': 'Ago', 'mon.9': 'Set', 'mon.10': 'Out', 'mon.11': 'Nov', 'mon.12': 'Dez'
    }
  };

  /* =========================================================
     The birds.

     Everything an ordinary person in Germany is likely to see at,
     in or around a nest box — every regular nest box and hole
     nester, the garden and woodland birds, the woodpeckers, the
     big birds and birds of prey, the water birds, and the
     non-birds that move in.

     `g` = which group it is shown under
     `c` = [body, head, cheek] colours for the little drawn bird
     `e` = an emoji instead, where a drawn songbird would be wrong

     The ids are never changed: they are what is written down in
     the saved sightings on the phone.
     ========================================================= */
  var GROUPS = ['common', 'nest', 'specht', 'garden', 'big', 'water', 'other'];

  var SPECIES = [
    /* ---------- the ones seen again and again ---------- */
    { id: 'great_tit',    g: 'common', de: 'Kohlmeise',         en: 'Great tit',        pt: 'Chapim-real',              c: ['#e8c534', '#23262b', '#ffffff'] },
    { id: 'blue_tit',     g: 'common', de: 'Blaumeise',         en: 'Blue tit',         pt: 'Chapim-azul',              c: ['#e8c534', '#2f6bd8', '#ffffff'] },
    { id: 'house_sparrow',g: 'common', de: 'Haussperling',      en: 'House sparrow',    pt: 'Pardal-comum',             c: ['#a67b4d', '#7b6a58', '#e6dccb'] },
    { id: 'tree_sparrow', g: 'common', de: 'Feldsperling',      en: 'Tree sparrow',     pt: 'Pardal-montês',            c: ['#a9825a', '#8a5a33', '#ffffff'] },
    { id: 'nuthatch',     g: 'common', de: 'Kleiber',           en: 'Nuthatch',         pt: 'Trepadeira-azul',          c: ['#6f8fb5', '#5d7ea6', '#f2e2c9'] },
    { id: 'starling',     g: 'common', de: 'Star',              en: 'Starling',         pt: 'Estorninho-malhado',       c: ['#3a3f52', '#2a2f3f', '#8d94a8'] },
    { id: 'robin',        g: 'common', de: 'Rotkehlchen',       en: 'Robin',            pt: 'Pisco-de-peito-ruivo',     c: ['#9a8a6a', '#d1622a', '#d1622a'] },
    { id: 'blackbird',    g: 'common', de: 'Amsel',             en: 'Blackbird',        pt: 'Melro-preto',              c: ['#1d1f22', '#141518', '#e8a11c'] },
    { id: 'flycatcher',   g: 'common', de: 'Trauerschnäpper',   en: 'Pied flycatcher',  pt: 'Papa-moscas-preto',        c: ['#2b2e33', '#2b2e33', '#ffffff'] },
    { id: 'redstart',     g: 'common', de: 'Gartenrotschwanz',  en: 'Common redstart',  pt: 'Rabirruivo-de-testa-branca', c: ['#8d8577', '#34373a', '#cf6b35'] },
    { id: 'black_redstart', g: 'common', de: 'Hausrotschwanz',  en: 'Black redstart',   pt: 'Rabirruivo-preto',         c: ['#4c4f52', '#3a3d40', '#6d7175'] },
    { id: 'wren',         g: 'common', de: 'Zaunkönig',         en: 'Wren',             pt: 'Carriça',                  c: ['#8a5f39', '#7a5231', '#d9c7a8'] },
    { id: 'wagtail',      g: 'common', de: 'Bachstelze',        en: 'White wagtail',    pt: 'Alvéola-branca',           c: ['#c9c9c4', '#1c1e21', '#ffffff'] },
    { id: 'swallow',      g: 'common', de: 'Rauchschwalbe',     en: 'Barn swallow',     pt: 'Andorinha-das-chaminés',   c: ['#2b3f6b', '#23345a', '#d8543f'] },

    /* ---------- other hole and nest box nesters ---------- */
    { id: 'coal_tit',     g: 'nest', de: 'Tannenmeise',         en: 'Coal tit',         pt: 'Chapim-carvoeiro',         c: ['#c4b79f', '#23262b', '#ffffff'] },
    { id: 'marsh_tit',    g: 'nest', de: 'Sumpfmeise',          en: 'Marsh tit',        pt: 'Chapim-palustre',          c: ['#b6ab97', '#2a2724', '#f0ece2'] },
    { id: 'willow_tit',   g: 'nest', de: 'Weidenmeise',         en: 'Willow tit',       pt: 'Chapim-boreal',            c: ['#bdb3a0', '#33302b', '#efeae0'] },
    { id: 'crested_tit',  g: 'nest', de: 'Haubenmeise',         en: 'Crested tit',      pt: 'Chapim-de-poupa',          c: ['#b9ad98', '#4a4540', '#f2ede3'] },
    { id: 'treecreeper',  g: 'nest', de: 'Waldbaumläufer',      en: 'Treecreeper',      pt: 'Trepadeira-eurasiática',   c: ['#8d7350', '#7b6444', '#f3efe6'] },
    { id: 'short_toed_treecreeper', g: 'nest', de: 'Gartenbaumläufer', en: 'Short-toed treecreeper', pt: 'Trepadeira-comum', c: ['#93795a', '#80684a', '#efe9dd'] },
    { id: 'spotted_flycatcher', g: 'nest', de: 'Grauschnäpper', en: 'Spotted flycatcher', pt: 'Papa-moscas-cinzento',   c: ['#9a948a', '#8b857b', '#e7e3da'] },
    { id: 'collared_flycatcher', g: 'nest', de: 'Halsbandschnäpper', en: 'Collared flycatcher', pt: 'Papa-moscas-de-colar', c: ['#26282c', '#26282c', '#ffffff'] },
    { id: 'house_martin', g: 'nest', de: 'Mehlschwalbe',        en: 'House martin',     pt: 'Andorinha-dos-beirais',    c: ['#2c3550', '#232b42', '#ffffff'] },
    { id: 'swift',        g: 'nest', de: 'Mauersegler',         en: 'Common swift',     pt: 'Andorinhão-preto',         c: ['#3a352f', '#2e2a25', '#b9b2a6'] },
    { id: 'grey_wagtail', g: 'nest', de: 'Gebirgsstelze',       en: 'Grey wagtail',     pt: 'Alvéola-cinzenta',         c: ['#8f9096', '#5c5e63', '#e9c93f'] },
    { id: 'jackdaw',      g: 'nest', de: 'Dohle',               en: 'Jackdaw',          pt: 'Gralha-de-nuca-cinzenta',  c: ['#2f3237', '#23262a', '#9aa1ab'] },
    { id: 'wryneck',      g: 'nest', de: 'Wendehals',           en: 'Wryneck',          pt: 'Torcicolo',                c: ['#9d8a6d', '#8a7a60', '#d8cdb6'] },
    { id: 'hoopoe',       g: 'nest', de: 'Wiedehopf',           en: 'Hoopoe',           pt: 'Poupa',                    c: ['#d8a05a', '#c98f49', '#2b2b2b'] },
    { id: 'stock_dove',   g: 'nest', de: 'Hohltaube',           en: 'Stock dove',       pt: 'Pombo-bravo',              c: ['#7e858f', '#6d7480', '#3f7a63'] },
    { id: 'kestrel',      g: 'nest', de: 'Turmfalke',           en: 'Kestrel',          pt: 'Peneireiro-vulgar',        e: '🦅' },
    { id: 'little_owl',   g: 'nest', de: 'Steinkauz',           en: 'Little owl',       pt: 'Mocho-galego',             e: '🦉' },
    { id: 'barn_owl',     g: 'nest', de: 'Schleiereule',        en: 'Barn owl',         pt: 'Coruja-das-torres',        e: '🦉' },
    { id: 'tawny_owl',    g: 'nest', de: 'Waldkauz',            en: 'Tawny owl',        pt: 'Coruja-do-mato',           e: '🦉' },
    { id: 'boreal_owl',   g: 'nest', de: 'Raufußkauz',          en: 'Boreal owl',       pt: 'Mocho-de-Tengmalm',        e: '🦉' },

    /* ---------- woodpeckers ---------- */
    { id: 'great_spotted_woodpecker',  g: 'specht', de: 'Buntspecht',      en: 'Great spotted woodpecker',  pt: 'Pica-pau-malhado-grande',  c: ['#1e1f22', '#141518', '#ffffff'] },
    { id: 'middle_spotted_woodpecker', g: 'specht', de: 'Mittelspecht',    en: 'Middle spotted woodpecker', pt: 'Pica-pau-mediano',         c: ['#232427', '#c8352c', '#f5f0e8'] },
    { id: 'lesser_spotted_woodpecker', g: 'specht', de: 'Kleinspecht',     en: 'Lesser spotted woodpecker', pt: 'Pica-pau-malhado-pequeno', c: ['#26272a', '#1a1b1e', '#f2ece2'] },
    { id: 'green_woodpecker',          g: 'specht', de: 'Grünspecht',      en: 'Green woodpecker',          pt: 'Peto-verde',               c: ['#6f8f3a', '#c8352c', '#f0e7cf'] },
    { id: 'grey_headed_woodpecker',    g: 'specht', de: 'Grauspecht',      en: 'Grey-headed woodpecker',    pt: 'Peto-de-cabeça-cinzenta',  c: ['#7d9448', '#8d9099', '#e9e4d6'] },
    { id: 'black_woodpecker',          g: 'specht', de: 'Schwarzspecht',   en: 'Black woodpecker',          pt: 'Pica-pau-preto',           c: ['#17181a', '#c8352c', '#17181a'] },
    { id: 'three_toed_woodpecker',     g: 'specht', de: 'Dreizehenspecht', en: 'Three-toed woodpecker',     pt: 'Pica-pau-tridáctilo',      c: ['#25262a', '#e2c93f', '#f0ebe1'] },

    /* ---------- garden and woodland birds ---------- */
    { id: 'song_thrush',   g: 'garden', de: 'Singdrossel',        en: 'Song thrush',      pt: 'Tordo-músico',            c: ['#8b7a5e', '#7b6c53', '#e8dcc4'] },
    { id: 'mistle_thrush', g: 'garden', de: 'Misteldrossel',      en: 'Mistle thrush',    pt: 'Tordoveia',               c: ['#95866c', '#867862', '#efe6d2'] },
    { id: 'fieldfare',     g: 'garden', de: 'Wacholderdrossel',   en: 'Fieldfare',        pt: 'Tordo-zornal',            c: ['#8a7455', '#5f6a7a', '#e0c86a'] },
    { id: 'redwing',       g: 'garden', de: 'Rotdrossel',         en: 'Redwing',          pt: 'Tordo-ruivo',             c: ['#8a7758', '#7a6a4e', '#c1602f'] },
    { id: 'dunnock',       g: 'garden', de: 'Heckenbraunelle',    en: 'Dunnock',          pt: 'Ferreirinha',             c: ['#7d6f5c', '#5f6a75', '#cfc6b4'] },
    { id: 'chaffinch',     g: 'garden', de: 'Buchfink',           en: 'Chaffinch',        pt: 'Tentilhão',               c: ['#c06a4a', '#6f8fb5', '#e9dcc6'] },
    { id: 'brambling',     g: 'garden', de: 'Bergfink',           en: 'Brambling',        pt: 'Tentilhão-montês',        c: ['#d08a3a', '#26282c', '#f0dfc0'] },
    { id: 'greenfinch',    g: 'garden', de: 'Grünfink',           en: 'Greenfinch',       pt: 'Verdilhão',               c: ['#7fa03a', '#6f9032', '#e3e08a'] },
    { id: 'goldfinch',     g: 'garden', de: 'Stieglitz',          en: 'Goldfinch',        pt: 'Pintassilgo',             c: ['#c9a06a', '#c8352c', '#f3ecdc'] },
    { id: 'siskin',        g: 'garden', de: 'Erlenzeisig',        en: 'Siskin',           pt: 'Lugre',                   c: ['#c2cc4a', '#2c2f24', '#e7ee9a'] },
    { id: 'linnet',        g: 'garden', de: 'Bluthänfling',       en: 'Linnet',           pt: 'Pintarroxo',              c: ['#9c7a55', '#8d6b48', '#c8402f'] },
    { id: 'bullfinch',     g: 'garden', de: 'Gimpel',             en: 'Bullfinch',        pt: 'Dom-fafe',                c: ['#c1503f', '#1d1e21', '#c1503f'] },
    { id: 'hawfinch',      g: 'garden', de: 'Kernbeißer',         en: 'Hawfinch',         pt: 'Bico-grossudo',           c: ['#b4835a', '#c99a5f', '#8c8f96'] },
    { id: 'serin',         g: 'garden', de: 'Girlitz',            en: 'Serin',            pt: 'Milheirinha',             c: ['#d3d24a', '#c2c13c', '#f0efa8'] },
    { id: 'crossbill',     g: 'garden', de: 'Fichtenkreuzschnabel', en: 'Crossbill',      pt: 'Cruza-bico',              c: ['#c1502f', '#b04628', '#e0a07a'] },
    { id: 'yellowhammer',  g: 'garden', de: 'Goldammer',          en: 'Yellowhammer',     pt: 'Escrevedeira-amarela',    c: ['#d9c03f', '#e6d24f', '#b58a2a'] },
    { id: 'reed_bunting',  g: 'garden', de: 'Rohrammer',          en: 'Reed bunting',     pt: 'Escrevedeira-dos-caniços', c: ['#8f7d5c', '#1e1f22', '#ffffff'] },
    { id: 'long_tailed_tit', g: 'garden', de: 'Schwanzmeise',     en: 'Long-tailed tit',  pt: 'Chapim-rabilongo',        c: ['#e8e2da', '#ffffff', '#c98a9a'] },
    { id: 'goldcrest',     g: 'garden', de: 'Wintergoldhähnchen', en: 'Goldcrest',        pt: 'Estrelinha-de-poupa',     c: ['#8fa05a', '#8fa05a', '#e8c23a'] },
    { id: 'firecrest',     g: 'garden', de: 'Sommergoldhähnchen', en: 'Firecrest',        pt: 'Estrelinha-real',         c: ['#8aa05f', '#e8c23a', '#ffffff'] },
    { id: 'blackcap',      g: 'garden', de: 'Mönchsgrasmücke',    en: 'Blackcap',         pt: 'Toutinegra-de-barrete',   c: ['#8f8f88', '#1d1e21', '#a8a8a0'] },
    { id: 'garden_warbler',g: 'garden', de: 'Gartengrasmücke',    en: 'Garden warbler',   pt: 'Felosa-das-figueiras',    c: ['#9c9280', '#8d8474', '#ded6c6'] },
    { id: 'whitethroat',   g: 'garden', de: 'Dorngrasmücke',      en: 'Whitethroat',      pt: 'Papa-amoras',             c: ['#9a8a6f', '#8b8b8b', '#ffffff'] },
    { id: 'chiffchaff',    g: 'garden', de: 'Zilpzalp',           en: 'Chiffchaff',       pt: 'Felosinha',               c: ['#8f9068', '#82835e', '#ded9c2'] },
    { id: 'willow_warbler',g: 'garden', de: 'Fitis',              en: 'Willow warbler',   pt: 'Felosa-musical',          c: ['#96a06a', '#89925f', '#e8e3c4'] },
    { id: 'reed_warbler',  g: 'garden', de: 'Teichrohrsänger',    en: 'Reed warbler',     pt: 'Rouxinol-pequeno-dos-caniços', c: ['#a08a68', '#8f7b5c', '#e6dcc8'] },
    { id: 'nightingale',   g: 'garden', de: 'Nachtigall',         en: 'Nightingale',      pt: 'Rouxinol',                c: ['#9a8064', '#8a7358', '#d8ccb8'] },
    { id: 'stonechat',     g: 'garden', de: 'Schwarzkehlchen',    en: 'Stonechat',        pt: 'Cartaxo',                 c: ['#a86a3a', '#1d1e21', '#ffffff'] },
    { id: 'golden_oriole', g: 'garden', de: 'Pirol',              en: 'Golden oriole',    pt: 'Papa-figos',              c: ['#e8c020', '#e8c020', '#1d1e21'] },
    { id: 'shrike',        g: 'garden', de: 'Neuntöter',          en: 'Red-backed shrike', pt: 'Picanço-de-dorso-ruivo', c: ['#b0713f', '#8f9aa8', '#f0e8dc'] },
    { id: 'waxwing',       g: 'garden', de: 'Seidenschwanz',      en: 'Waxwing',          pt: 'Picoteiro',               c: ['#b08a70', '#c08a5a', '#2b2b2b'] },
    { id: 'skylark',       g: 'garden', de: 'Feldlerche',         en: 'Skylark',          pt: 'Laverca',                 c: ['#a08f6c', '#8f7f5e', '#e4dcc6'] },
    { id: 'meadow_pipit',  g: 'garden', de: 'Wiesenpieper',       en: 'Meadow pipit',     pt: 'Petinha-dos-prados',      c: ['#9a8f6a', '#8b8158', '#e0dac4'] },
    { id: 'white_stork',   g: 'garden', de: 'Weißstorch',         en: 'White stork',      pt: 'Cegonha-branca',          c: ['#f2f0ea', '#ffffff', '#c8352c'] },

    /* ---------- large birds and birds of prey ---------- */
    { id: 'magpie',        g: 'big', de: 'Elster',            en: 'Magpie',         pt: 'Pega-rabuda',                 c: ['#1d1f22', '#141518', '#ffffff'] },
    { id: 'jay',           g: 'big', de: 'Eichelhäher',       en: 'Jay',            pt: 'Gaio',                        c: ['#c08a68', '#b8805e', '#3f6fb5'] },
    { id: 'carrion_crow',  g: 'big', de: 'Rabenkrähe',        en: 'Carrion crow',   pt: 'Gralha-preta',                c: ['#1a1b1d', '#141517', '#2a2c2f'] },
    { id: 'rook',          g: 'big', de: 'Saatkrähe',         en: 'Rook',           pt: 'Gralha-calva',                c: ['#1c1d20', '#16171a', '#d8d2c8'] },
    { id: 'raven',         g: 'big', de: 'Kolkrabe',          en: 'Raven',          pt: 'Corvo',                       c: ['#141517', '#0f1012', '#26282b'] },
    { id: 'wood_pigeon',   g: 'big', de: 'Ringeltaube',       en: 'Wood pigeon',    pt: 'Pombo-torcaz',                c: ['#8a8f99', '#767c86', '#ffffff'] },
    { id: 'collared_dove', g: 'big', de: 'Türkentaube',       en: 'Collared dove',  pt: 'Rola-turca',                  c: ['#c4b3a2', '#b6a493', '#3a3a3a'] },
    { id: 'feral_pigeon',  g: 'big', de: 'Stadttaube',        en: 'Feral pigeon',   pt: 'Pombo-doméstico',             c: ['#6f757f', '#5e646d', '#4a8f7a'] },
    { id: 'cuckoo',        g: 'big', de: 'Kuckuck',           en: 'Cuckoo',         pt: 'Cuco',                        c: ['#8b9099', '#787d86', '#f0f0ee'] },
    { id: 'pheasant',      g: 'big', de: 'Fasan',             en: 'Pheasant',       pt: 'Faisão',                      c: ['#a8562a', '#2f6b4a', '#c8352c'] },
    { id: 'grey_heron',    g: 'big', de: 'Graureiher',        en: 'Grey heron',     pt: 'Garça-real',                  c: ['#b6bbc2', '#e8e8e6', '#1d1e21'] },
    { id: 'crane',         g: 'big', de: 'Kranich',           en: 'Crane',          pt: 'Grou',                        c: ['#9aa0a6', '#1d1e21', '#c8352c'] },
    { id: 'buzzard',       g: 'big', de: 'Mäusebussard',      en: 'Common buzzard', pt: 'Águia-d’asa-redonda',         e: '🦅' },
    { id: 'sparrowhawk',   g: 'big', de: 'Sperber',           en: 'Sparrowhawk',    pt: 'Gavião',                      e: '🦅' },
    { id: 'goshawk',       g: 'big', de: 'Habicht',           en: 'Goshawk',        pt: 'Açor',                        e: '🦅' },
    { id: 'red_kite',      g: 'big', de: 'Rotmilan',          en: 'Red kite',       pt: 'Milhafre-real',               e: '🦅' },

    /* ---------- water birds ---------- */
    { id: 'mallard',       g: 'water', de: 'Stockente',       en: 'Mallard',            pt: 'Pato-real',                e: '🦆' },
    { id: 'goldeneye',     g: 'water', de: 'Schellente',      en: 'Goldeneye',          pt: 'Pato-olho-d’ouro',         e: '🦆' },
    { id: 'mute_swan',     g: 'water', de: 'Höckerschwan',    en: 'Mute swan',          pt: 'Cisne-branco',             e: '🦢' },
    { id: 'greylag_goose', g: 'water', de: 'Graugans',        en: 'Greylag goose',      pt: 'Ganso-bravo',              e: '🪿' },
    { id: 'coot',          g: 'water', de: 'Blässhuhn',       en: 'Coot',               pt: 'Galeirão',                 c: ['#26282c', '#1d1e21', '#ffffff'] },
    { id: 'moorhen',       g: 'water', de: 'Teichhuhn',       en: 'Moorhen',            pt: 'Galinha-d’água',           c: ['#2c3038', '#232730', '#c8352c'] },
    { id: 'black_headed_gull', g: 'water', de: 'Lachmöwe',    en: 'Black-headed gull',  pt: 'Guincho',                  c: ['#f0f0ee', '#3a2b2b', '#c8352c'] },
    { id: 'cormorant',     g: 'water', de: 'Kormoran',        en: 'Cormorant',          pt: 'Corvo-marinho',            c: ['#1d1f22', '#16181a', '#e0c060'] },
    { id: 'kingfisher',    g: 'water', de: 'Eisvogel',        en: 'Kingfisher',         pt: 'Guarda-rios',              c: ['#2f8fc8', '#1f7fb8', '#d1722a'] },

    /* ---------- guests that are not birds ---------- */
    { id: 'bats',          g: 'other', de: 'Fledermäuse',            en: 'Bats',              pt: 'Morcegos',            e: '🦇' },
    { id: 'bees',          g: 'other', de: 'Bienen oder Wespen',     en: 'Bees or wasps',     pt: 'Abelhas ou vespas',   e: '🐝' },
    { id: 'dormouse',      g: 'other', de: 'Siebenschläfer',         en: 'Edible dormouse',   pt: 'Arganaz',             e: '🐭' },
    { id: 'rodents',       g: 'other', de: 'Mäuse oder Eichhörnchen', en: 'Mice or squirrel', pt: 'Ratos ou esquilo',    e: '🐿️' },

    /* ---------- always last, always shown ---------- */
    { id: 'other',         g: 'other', de: 'Anderer Vogel',          en: 'Another bird',      pt: 'Outro pássaro',       e: '❓' }
  ];


  /* Everyday names people actually say, so the search finds the bird even
     when the book name is not the one on the tip of the tongue. */
  var ALT = {
    house_sparrow: 'Spatz Sperling',
    tree_sparrow: 'Feldspatz Sperling Spatz',
    blackbird: 'Schwarzdrossel Drossel',
    robin: 'Rotbrüstchen Rotkehlchen',
    wren: 'Zaunschlüpfer Schlüpferl',
    redstart: 'Rotschwänzchen Rotschwanz',
    black_redstart: 'Rotschwänzchen Rotschwanz',
    swallow: 'Schwalbe',
    house_martin: 'Schwalbe',
    swift: 'Segler Spyr',
    nuthatch: 'Spechtmeise',
    treecreeper: 'Baumläufer',
    short_toed_treecreeper: 'Baumläufer',
    dunnock: 'Braunelle Heckenspatz',
    starling: 'Sprehe',
    jackdaw: 'Krähe Dahle',
    kestrel: 'Falke Rüttelfalke Greifvogel',
    little_owl: 'Eule Kauz',
    barn_owl: 'Eule Kauz',
    tawny_owl: 'Eule Kauz',
    boreal_owl: 'Eule Kauz',
    chaffinch: 'Fink',
    brambling: 'Fink',
    greenfinch: 'Grünling Fink',
    goldfinch: 'Distelfink Fink',
    siskin: 'Zeisig Fink',
    linnet: 'Hänfling Fink',
    bullfinch: 'Dompfaff Blutfink Fink',
    hawfinch: 'Kirschkernbeißer Fink',
    serin: 'Fink',
    crossbill: 'Kreuzschnabel Fink',
    jay: 'Häher Markwart',
    magpie: 'Atzel Alster',
    carrion_crow: 'Krähe Rabe',
    rook: 'Krähe Rabe',
    raven: 'Rabe Krähe',
    wood_pigeon: 'Taube',
    collared_dove: 'Taube',
    feral_pigeon: 'Taube',
    stock_dove: 'Taube',
    buzzard: 'Bussard Greifvogel',
    sparrowhawk: 'Greifvogel Habicht',
    goshawk: 'Greifvogel',
    red_kite: 'Milan Gabelweihe Greifvogel',
    white_stork: 'Storch Adebar',
    grey_heron: 'Reiher Fischreiher',
    crane: 'Kranich',
    mallard: 'Ente Wildente',
    goldeneye: 'Ente',
    mute_swan: 'Schwan',
    greylag_goose: 'Gans Wildgans',
    black_headed_gull: 'Möwe',
    coot: 'Blesshuhn Wasserhuhn',
    moorhen: 'Wasserhuhn',
    long_tailed_tit: 'Schwanzmeise Pfannenstiel',
    goldcrest: 'Goldhähnchen',
    firecrest: 'Goldhähnchen',
    golden_oriole: 'Vogel Bülow',
    dormouse: 'Bilch Schläfer',
    rodents: 'Maus Eichhörnchen Nager'
  };

  var lang = 'de';

  function t(key, vars) {
    var table = STR[lang] || STR.de;
    var s = table[key];
    if (s === undefined) s = STR.de[key];
    if (s === undefined) return key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.split('{' + k + '}').join(vars[k]);
      });
    }
    return s;
  }

  function speciesName(id) {
    for (var i = 0; i < SPECIES.length; i++) {
      if (SPECIES[i].id === id) return SPECIES[i][lang] || SPECIES[i].de;
    }
    return id;
  }

  function speciesDef(id) {
    for (var i = 0; i < SPECIES.length; i++) if (SPECIES[i].id === id) return SPECIES[i];
    return null;
  }

  /* everything in one group, in the order written above */
  function speciesInGroup(g) {
    return SPECIES.filter(function (s) { return s.g === g && s.id !== 'other'; });
  }

  /* strips accents so "moenchsgrasmuecke" and "monchs" both find the Mönchsgrasmücke */
  function fold(s) {
    s = String(s).toLowerCase();
    if (s.normalize) s = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
    return s.replace(/ß/g, 'ss').replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u')
      .replace(/ae/g, 'a').replace(/oe/g, 'o').replace(/ue/g, 'u')
      .replace(/[^a-z0-9]/g, '');
  }

  /* searches the name in every language, so it works whichever one is on */
  function speciesSearch(query) {
    var q = fold(query);
    if (!q) return [];
    return SPECIES.filter(function (s) {
      if (s.id === 'other') return false;
      return fold(s.de).indexOf(q) >= 0 || fold(s.en).indexOf(q) >= 0 ||
        fold(s.pt).indexOf(q) >= 0 || fold(ALT[s.id] || '').indexOf(q) >= 0;
    });
  }

  /* Replaces the text of every element carrying data-i18n / -ph / -aria */
  function applyTo(root) {
    (root || document).querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    (root || document).querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
    });
    (root || document).querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
  }

  global.I18N = {
    get lang() { return lang; },
    set: function (l) {
      lang = STR[l] ? l : 'de';
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('data-lang', lang);
    },
    t: t,
    applyTo: applyTo,
    SPECIES: SPECIES,
    GROUPS: GROUPS,
    speciesName: speciesName,
    speciesDef: speciesDef,
    speciesInGroup: speciesInGroup,
    speciesSearch: speciesSearch,
    locale: function () { return lang === 'pt' ? 'pt-PT' : (lang === 'en' ? 'en-GB' : 'de-DE'); }
  };
})(window);
