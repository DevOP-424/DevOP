
document.querySelector('#addcol').addEventListener('click', () => {
    let col = document.createElement('div');
    col.setAttribute('class', 'column');
    let txt = document.createElement('input')
    txt.setAttribute('type' , 'text');
    txt.setAttribute('placeholder' , '....');
    col.append(txt);
    document.querySelector(".column-container").append(col);
  });