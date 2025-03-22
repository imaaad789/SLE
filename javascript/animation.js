$(function(){
    $(document).ready(function(){
        let etoilcontainer=$('<div>',{class:'etoil-container'});
        $("body").append(etoilcontainer);

        let numberEt=100;
        for(let i=0;i<numberEt;i++){
            let etoil=$('<div>',{class:'etoil'});
            let size=Math.random()*3+1;
            etoil.css({
                'width': `${size}px`,
                'height': `${size}px`,
                'left': `${Math.random()*100}%`,
                'top': `${Math.random()*100}%`,
                'animation-duration': `${Math.random()* 10+10}s`,
                'animation-delay': `${Math.random()*10}s`
            });
            etoilcontainer.append(etoil);
        }
    })
})