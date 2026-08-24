/* =========================================================
   i18n — every visible string lives here (English + Português)
   ========================================================= */
(function (global) {
  'use strict';

  var STR = {
    en: {
      'app.name': 'My Bird Houses',

      'nav.map': 'Map', 'nav.houses': 'Houses', 'nav.add': 'Add', 'nav.stats': 'Numbers',
      'nav.help': 'Help', 'nav.settings': 'Settings',

      'common.back': 'Back', 'common.next': 'Next', 'common.save': 'Save',
      'common.cancel': 'Cancel', 'common.delete': 'Delete', 'common.close': 'Close',
      'common.done': 'Done', 'common.skip': 'Skip', 'common.edit': 'Edit',
      'common.optional': 'optional', 'common.notes': 'Notes', 'common.finish': 'Finish',
      'common.remove': 'Remove', 'common.none': 'None yet',

      'map.locate': 'Go to my location', 'map.fit': 'Show all bird houses',
      'map.satellite': 'Satellite', 'map.streets': 'Map',
      'map.addHere': 'Add a bird house',
      'map.emptyTitle': 'No bird houses yet.',
      'map.emptyHint': 'Tap the green button below to add your first one.',
      'map.locating': 'Looking for your location…',
      'map.locateFail': 'Could not find your location. Move the map by hand instead.',
      'map.tapPin': 'Tap a pin to open a bird house.',

      'list.sortBy': 'Sort by', 'list.sortName': 'Name',
      'list.sortRecent': 'Recently added', 'list.sortCondition': 'Needs attention first',
      'list.empty': 'No bird houses yet.',
      'list.emptyHint': 'Use the “Add” button at the bottom to add one.',

      'wiz.q1': '1. Where is the bird house?',
      'wiz.q1help': 'Move the map until the pin sits on the right spot.',
      'wiz.q2': '2. Take a photo of the tree',
      'wiz.q2help': 'This helps you find the bird house again. You can skip this and add photos later.',
      'wiz.q3': '3. Give it a name',
      'wiz.q3help': 'Something you will recognise, like “Big oak by the gate”.',
      'wiz.namePlaceholder': 'Big oak by the gate',
      'wiz.treeKind': 'What kind of tree is it on?',
      'wiz.treeKindPlaceholder': 'Oak, pine, apple tree…',
      'wiz.condition': 'How is the bird house right now?',
      'wiz.putUp': 'When did you put it up?',
      'wiz.savedTitle': 'Saved!',
      'wiz.openHouse': 'Open this bird house',
      'wiz.addAnother': 'Add another one',
      'wiz.takePhoto': 'Take a photo',
      'wiz.useMyLocation': 'Use my location',
      'wiz.needName': 'Please give the bird house a name first.',
      'wiz.savedAs': 'You saved: {name}',

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
      'house.deleteHouse': 'Delete this bird house',
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

      'maint.title': 'Cleaning and repairs',
      'maint.what': 'What did you do?',
      'maint.cleaned': 'Cleaned it out', 'maint.repaired': 'Repaired it',
      'maint.replaced': 'Put up a new one', 'maint.checked': 'Just had a look',
      'maint.when': 'When did you do it?',
      'maint.newCondition': 'How is it now?',
      'maint.saveIt': 'Save this job',

      'stats.title': 'Your numbers',
      'stats.totalHouses': 'Bird houses',
      'stats.withBirds': 'Used by birds this year',
      'stats.needAttention': 'Need attention',
      'stats.cleanedYear': 'Cleaned this year',
      'stats.byCondition': 'Condition of your bird houses',
      'stats.topSpecies': 'Most common birds',
      'stats.topSpeciesSub': 'How many bird houses each bird was seen in',
      'stats.byMonth': 'When birds were seen',
      'stats.byMonthSub': 'Number of sightings in each month',
      'stats.attention': 'Bird houses to look at',
      'stats.attentionSub': 'Broken, needing repair, or not cleaned for over a year',
      'stats.allGood': 'Everything looks fine. Nothing needs attention.',
      'stats.empty': 'Add your first bird house and the numbers will appear here.',
      'stats.year': 'Year', 'stats.allYears': 'All years',
      'stats.showTable': 'Show the same thing as a list',
      'stats.species': 'Bird', 'stats.houses': 'Bird houses', 'stats.count': 'Times seen',
      'stats.month': 'Month',
      'stats.totalSightings': 'Birds written down',
      'stats.speciesCount': 'Different birds',
      'stats.noSightings': 'No birds written down yet for this year.',

      'settings.title': 'Settings',
      'settings.language': 'Language',
      'settings.backup': 'Keep your information safe',
      'settings.backupDesc': 'Everything is kept on this phone only. Save a copy from time to time, so nothing is lost.',
      'settings.saveBackup': 'Save a copy to my phone',
      'settings.restore': 'Load a saved copy',
      'settings.restoreDesc': 'This will replace everything that is on this phone now.',
      'settings.restoreBtn': 'Choose a saved copy',
      'settings.restoreConfirm': 'Replace everything on this phone with the saved copy?',
      'settings.about': 'About',
      'settings.aboutText': 'This app works without internet, except for the map pictures. Nothing is sent anywhere — your bird houses stay on this phone.',
      'settings.install': 'Add to home screen',
      'settings.installText': 'Open the browser menu and choose “Add to Home screen” to use this like a normal app.',
      'settings.clearAll': 'Delete everything',
      'settings.clearWarn': 'Delete ALL bird houses, birds, repairs and photos? This cannot be undone.',
      'settings.photos': 'Photos saved',

      'help.title': 'How to use this',
      'help.s1': 'Tap “Add” at the bottom. Move the map so the pin is on your bird house, then take a photo of the tree and give it a name.',
      'help.s2': 'On the “Map” tab you see all your bird houses. The colour of the pin shows how the bird house is doing. Tap a pin to open it.',
      'help.s3': 'When you see a bird, open that bird house and tap “I saw a bird here”. Choose the bird and the month.',
      'help.s4': 'After cleaning or fixing a bird house, tap “I cleaned or repaired it”. The app remembers the date for you.',
      'help.s5': 'The “Numbers” tab counts everything for you: how many bird houses you have, which birds are the most common, and which houses need a look.',
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

      'nav.map': 'Mapa', 'nav.houses': 'Casinhas', 'nav.add': 'Juntar', 'nav.stats': 'Contas',
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
      'list.emptyHint': 'Use o botão “Juntar” lá em baixo para juntar uma.',

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
      'help.s1': 'Toque em “Juntar” lá em baixo. Mova o mapa até o pino ficar na sua casinha, tire uma foto da árvore e dê-lhe um nome.',
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

  /* ---------- birds people actually find in nest boxes ---------- */
  /* `c` = [body, head, cheek] colours for the drawn icon; `e` = emoji instead */
  var SPECIES = [
    { id: 'great_tit',       en: 'Great tit',       pt: 'Chapim-real',            c: ['#e8c534', '#23262b', '#ffffff'] },
    { id: 'blue_tit',        en: 'Blue tit',        pt: 'Chapim-azul',            c: ['#e8c534', '#2f6bd8', '#ffffff'] },
    { id: 'coal_tit',        en: 'Coal tit',        pt: 'Chapim-carvoeiro',       c: ['#c4b79f', '#23262b', '#ffffff'] },
    { id: 'house_sparrow',   en: 'House sparrow',   pt: 'Pardal',                 c: ['#a67b4d', '#7b6a58', '#e6dccb'] },
    { id: 'tree_sparrow',    en: 'Tree sparrow',    pt: 'Pardal-montês',          c: ['#a9825a', '#8a5a33', '#ffffff'] },
    { id: 'nuthatch',        en: 'Nuthatch',        pt: 'Trepadeira-azul',        c: ['#6f8fb5', '#5d7ea6', '#f2e2c9'] },
    { id: 'starling',        en: 'Starling',        pt: 'Estorninho',             c: ['#3a3f52', '#2a2f3f', '#8d94a8'] },
    { id: 'robin',           en: 'Robin',           pt: 'Pisco-de-peito-ruivo',   c: ['#9a8a6a', '#d1622a', '#d1622a'] },
    { id: 'redstart',        en: 'Redstart',        pt: 'Rabirruivo',             c: ['#8d8577', '#34373a', '#cf6b35'] },
    { id: 'flycatcher',      en: 'Pied flycatcher', pt: 'Papa-moscas-preto',      c: ['#2b2e33', '#2b2e33', '#ffffff'] },
    { id: 'swallow',         en: 'Swallow',         pt: 'Andorinha',              c: ['#2b3f6b', '#23345a', '#d8543f'] },
    { id: 'wren',            en: 'Wren',            pt: 'Carriça',                c: ['#8a5f39', '#7a5231', '#d9c7a8'] },
    { id: 'hoopoe',          en: 'Hoopoe',          pt: 'Poupa',                  c: ['#d8a05a', '#c98f49', '#2b2b2b'] },
    { id: 'little_owl',      en: 'Little owl',      pt: 'Mocho-galego',           e: '🦉' },
    { id: 'barn_owl',        en: 'Barn owl',        pt: 'Coruja-das-torres',      e: '🦉' },
    { id: 'bats',            en: 'Bats',            pt: 'Morcegos',               e: '🦇' },
    { id: 'bees',            en: 'Bees or wasps',   pt: 'Abelhas ou vespas',      e: '🐝' },
    { id: 'rodents',         en: 'Mice or squirrel',pt: 'Ratos ou esquilo',       e: '🐿️' },
    { id: 'other',           en: 'Another bird',    pt: 'Outro pássaro',          e: '❓' }
  ];

  var lang = 'en';

  function t(key, vars) {
    var table = STR[lang] || STR.en;
    var s = table[key];
    if (s === undefined) s = STR.en[key];
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
      if (SPECIES[i].id === id) return SPECIES[i][lang] || SPECIES[i].en;
    }
    return id;
  }

  function speciesDef(id) {
    for (var i = 0; i < SPECIES.length; i++) if (SPECIES[i].id === id) return SPECIES[i];
    return null;
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
      lang = STR[l] ? l : 'en';
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('data-lang', lang);
    },
    t: t,
    applyTo: applyTo,
    SPECIES: SPECIES,
    speciesName: speciesName,
    speciesDef: speciesDef,
    locale: function () { return lang === 'pt' ? 'pt-PT' : 'en-GB'; }
  };
})(window);
