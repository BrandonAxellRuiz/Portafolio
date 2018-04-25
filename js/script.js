const crud = new Firebase("https://backhome-16b56.firebaseio.com/Portafolio/");

var div_body = `<div class="post-wrapper wow fadeIn" data-wow-delay="0.2s" v-for="(item, key) in DataRecive" :key="key">
    <!--Post data-->
    <h1 class="h1-responsive font-bold">{{item.Client}}
        <br>
        <small class="text-muted"> {{item.Title}}</small>
    </h1>
    <h6>{{item.DateCreate}} | <strong>{{item.TypeSystem}}</strong>
    </h6>
    <br>

    <!--Featured image -->

    <!--Carousel Wrapper-->
 
        <div :id="key" class="carousel slide carousel-fade" data-ride="carousel">
            <!--Indicators-->
            <ol class="carousel-indicators">
                <li :data-target="'#'+key+''" data-slide-to="0" class="active"></li>
                <li :data-target="'#'+key+''" data-slide-to="1"></li>
                <li :data-target="'#'+key+''" data-slide-to="2"></li>
            </ol>
            <!--/.Indicators-->
            <!--Slides-->
            <div class="carousel-inner" role="listbox" title="Change image">
                <!--First slide-->
                <div class="carousel-item active">
                    <img :src="item.ImageActive" alt="First slide" class="img-fluid">
                    <div class="carousel-caption">
                        <!-- <h4 style="color:black"><b>New collection</b></h4>-->
                        <br>
                    </div>
                </div>
                 <!--First slide-->
                <div class="carousel-item">
                    <img :src="item.ImageSecond" alt="First slide" class="img-fluid">
                    <div class="carousel-caption">
                        <!--<h4 style="color:black"><b>New collection</b></h4>-->
                        <br>
                    </div>
                </div>  
                <div class="carousel-item">
                    <img :src="item.ImageThird" alt="First slide" class="img-fluid">
                    <div class="carousel-caption">                         
                        <!--<h4 style="color:black"><b>New collection</b></h4>-->
                        <br>
                    </div>
                </div>  
            </div>
            <!--/.Slides-->
            <!--Controls-->
            <a class="carousel-control-prev" :href="'#'+key+''" role="button" data-slide="prev" title="Previous">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" :href="'#'+key+''" role="button" data-slide="next" title="Next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
            <!--/.Controls-->
        </div>


    <br>

    <!--Post excerpt-->
    <h5 class="price">
        <span class="badge brown darken-2">
            {{item.Tags}}
        </span>
    </h5>
    <p>{{item.Description}}</p>

    <!--"Read more" button-->
    <a class="btn btn-info" :href="item.UrlVisit" target="_blank">Visitar</a>
    <br>
    <br>
    <hr>
    <hr>
</div>
<!--/.Post-->


`;

var pagination = `
<!--Pagination-->
<nav>
    <ul class="pagination flex-center pg-dark  wow fadeIn" data-wow-delay="0.2s">
        <!--Arrow left-->
        <li class="page-item">
            <a class="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
            </a>
        </li>

        <!--Numbers-->
        <li class="page-item active"><a class="page-link">1</a></li>

        <!--Arrow right-->
        <li class="page-item">
            <a class="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </a>
        </li>
    </ul>
</nav>
<!--/.Pagination-->
`;


Vue.component("items_data_load", {
  data() {
    return { DataRecive: {} };
  },
  created() {
    crud.on("value", snap => {
      this.DataRecive = snap.val();
    });
  },
  template: "<div>" + this.div_body + "</div>"
});

Vue.component('items_pagination', {
    template: '<div>' + this.pagination + '</div>'
});

new Vue({
  el: "#data_load",
});
   

