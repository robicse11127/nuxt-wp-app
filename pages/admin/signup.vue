<template>
    <div>
        <b-row>
            <b-col md="6" offset-md="3" class="mt-5">
                <b-card header="Signup" class="" header-tag="h2">
                    <b-form @submit="onSubmit" @reset="onReset">
                        <div class="form-group">
                            <label for="">Username: </label>
                            <input type="text" name="username" id="" class="form-control" placeholder="Username">
                        </div>
                        <div class="form-group">
                            <label for="">Password: </label>
                            <input type="password" name="password" id="" class="form-control" placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="">Email: </label>
                            <input type="email" name="email" id="" class="form-control" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <b-button type="submit" variant="primary">Submit</b-button>
                        </div>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>