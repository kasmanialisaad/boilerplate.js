{{-- How To Use

@include('_components.analytics', ['slot' => 'UA-XXXXX-X'])

or

@component('_components.analytics')
    UA-XXXXX-X
@endcomponent 

--}}

<!-- Google Analytics -->
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', {{ $slot }}, 'auto');
    ga('send', 'pageview');
</script>
<!-- End Google Analytics -->