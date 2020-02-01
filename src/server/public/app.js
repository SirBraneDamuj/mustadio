$(document).ready(() => {
    $('.team-bet-button').click((e) => {
        e.preventDefault();

        const target = $(e.currentTarget);
        const team = target.attr('team-name');
        const amount = target.attr('amount');

        $.post('/bet', {
            data: { team, amount },
        });
        $('.team-bet-button').attr('disabled', true);
        $('.team-allin-button').attr('disabled', true);
    });

    $('.team-allin-button').click((e) => {
        e.preventDefault();

        const target = $(e.currentTarget);
        const team = target.attr('team-name');

        $.post(`/allin/${team}`);
        $('.team-bet-button').attr('disabled', true);
        $('.team-allin-button').attr('disabled', true);
    });
});